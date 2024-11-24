import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import { EntityTarget } from "typeorm";
import { typeOrmToAjvTypesMapping } from "../mappings";
import { handler } from "../config/dbconfig";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// add the date related columns here
const dateColumns: string[] = ["modifiedDate", "createdDate"];
const ignoreRequiredCheck: string[] = ["id"];

/**
 This function can create ajv scheama by using typeorm enitity.
 **/
export const getModelSchema = async <T extends EntityTarget<T>>(
  model: T,
  baseModel: string,
  level = 1
): Promise<{
  type: "object";
  properties: object;
  required: string[];
  additionalProperties: boolean;
}> => {
  try {
    //1. get the datasource object
    const appDataSource = await handler();
    const entityMetadata = appDataSource.getMetadata(model);
    // Map through the relations to retrieve the class names
    //3. intialize empty schema object
    const schemaObject: {
      type: "object";
      properties: object;
      required: string[];
      additionalProperties: boolean;
    } = {
      type: "object",
      properties: {},
      required: [],
      additionalProperties: false,
    };
    const relations = entityMetadata.relations.map((relation) => {
      return {
        propertyName: relation.propertyName,
        relationType: relation.relationType,
        className: relation.inverseEntityMetadata.targetName, // Get the class name of the related entity
      };
    });
    //3. loop through relations and crate a scheama for each relation entity
    for (const relation of relations) {
      // if (relation.relationType === "one-to-many") {
      //   //a. get the scheama oject for that entity
      //   const relativeModelSchema = await getModelSchema(relation.className);
      //   schemaObject["properties"][relation.propertyName] = {
      //     type: "array",
      //     //b. assign to properties
      //     items: relativeModelSchema,
      //   };
      //   //b. make it required
      //   schemaObject.required.push(relation.propertyName);
      // }
      if (
        relation.relationType === "many-to-one" &&
        level < 4 &&
        entityMetadata.targetName != baseModel
      ) {
        //a. get the scheama oject for that entity

        const relativeModelSchema = await getModelSchema(
          relation.className,
          baseModel,
          level++
        );
        // set only id as required
        relativeModelSchema.required = ["id"];
        schemaObject["properties"][relation.propertyName] = relativeModelSchema;
        //b. make it required
        schemaObject.required.push(relation.propertyName);
      }
    }
    level = level;
    //2. get model properties
    const modelProperties = entityMetadata.ownColumns.map((column) => {
      return {
        type: column.type,
        name: column?.propertyName,
        required: !column.isNullable,
      };
    });

    //4. loop through properties
    modelProperties.forEach((value) => {
      //1. get the type according to the name
      if (typeOrmToAjvTypesMapping[`${value.type}`]) {
        schemaObject["properties"][`${value.name}`] = {
          type: typeOrmToAjvTypesMapping[`${value.type}`]?.type,
          ...(typeOrmToAjvTypesMapping[`${value.type}`]?.format ||
          dateColumns.includes(`${value?.name}`)
            ? {
                format: "date-time",
                // format: typeOrmToAjvTypesMapping[`${value.type}`]?.format
              }
            : {}),
        };
      }
      //2. else assign the string value
      else {
        schemaObject["properties"][`${value?.name}`] = {
          type: "string",
        };
      }
      //e. check if value is required
      if (value.required && !ignoreRequiredCheck.includes(`${value.name}`)) {
        schemaObject.required.push(`${value.name}`);
      }
    });
    return schemaObject;
  } catch (e) {
    throw e;
  }
};

/** this function can validate req body agains the schema*/
export const validateRequestBody = <T extends EntityTarget<T>>(model: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //1. get the datasource object
      const appDataSource = await handler();
      const entityMetadata = appDataSource.getMetadata(model);
      const schemaObject = await getModelSchema(
        model,
        entityMetadata.targetName
      );
      //2. add tabs scheama
      // Map through the relations to retrieve the class names
      const relations = entityMetadata.relations.map((relation) => {
        return {
          propertyName: relation.propertyName,
          relationType: relation.relationType,
          className: relation.inverseEntityMetadata.targetName, // Get the class name of the related entity
        };
      });

      //3. loop through relations and crate a scheama for each relation entity
      for (const relation of relations) {
        if (relation.relationType === "one-to-many") {
          //a. get the scheama oject for that entity
          const relativeModelSchema = await getModelSchema(
            relation.className,
            entityMetadata.targetName
          );
          schemaObject["properties"][relation.propertyName] = {
            type: "array",
            //b. assign to properties
            items: relativeModelSchema,
          };
          //b. make it required
          schemaObject.required.push(relation.propertyName);
        }
        if (relation.relationType === "many-to-one") {
          //a. get the scheama oject for that entity
          const relativeModelSchema = await getModelSchema(
            relation.className,
            entityMetadata.targetName
          );
          // set only id as required
          relativeModelSchema.required = ["id"];
          schemaObject["properties"][relation.propertyName] =
            relativeModelSchema;
          //b. make it required
          schemaObject.required.push(relation.propertyName);
        }
      }

      
      
      const validate = ajv.compile(schemaObject);
      const valid = validate(req.body);
      if (!valid) {
        throw validate.errors;
      }
      next();
    } catch (error) {
      res.status(422).json(error);
    }
  };
};
