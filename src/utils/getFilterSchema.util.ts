
import { NextFunction, Request, Response } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { handler } from "../config/dbconfig";
import { EntityTarget } from "typeorm";
import { typeOrmToAjvTypesMapping } from "../mappings";
import { ItemDescription } from "../entities";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
/**
 This function can create ajv select scheama by using typeorm enitity.
 **/
/**exp -:
             {
          "select": {
            "id": true,
            "name": true,
            "relation1": {
              "id": true,
              "name": true,
              "relation12": {
                "id": true,
                "name": true
              }
            }
          }
        }

        **/
const getWhereSchema = async <T extends EntityTarget<T>>(
  model: T,
  baseModelName?: string
): Promise<[{
  type: "object";
  properties: object;
  required: string[];
}, any]> => {
  try {
    //1. get the datasource object
    const appDataSource = await handler();
    const entityMetadata = appDataSource.getMetadata(model);
    //2. get model properties
    const modelProperties = entityMetadata.ownColumns.map((column) => {
      return {
        type: column.type,
        name: column.propertyName,
        required: !column.isNullable,
      };
    });
    //3. intialize empty schema object
    const schemaObject: {
      type: "object";
      properties: object;
      required: string[];
    } = {
      type: "object",
      properties: {},
      required: [],
    };
    const relationObject: any = {

    }
    modelProperties.forEach((value) => {
      //1. get the type according to the name
      schemaObject["properties"][value.name] = {
        type: "boolean",
      };
    });

    const relations = entityMetadata.relations.map((relation) => {
      return {
        propertyName: relation.propertyName,
        relationType: relation.relationType,
        className: relation.inverseEntityMetadata.targetName,
        // name:relation.inverseEntityMetadata. // Get the class name of the related entity
      };
    });

    //3. loop through relations and crate a scheama for each relation entity

    for (const relation of relations) {
      if (baseModelName !== relation.className) {
        //a. get the scheama oject for that entity
        const [relativeModelSchema, sample] = await getWhereSchema(
          relation.className,
          baseModelName
        );
        schemaObject["properties"][relation.propertyName] = relativeModelSchema;
        relationObject[relation.propertyName] = sample
        //   //b. make it required
        //   schemaObject.required.push(relation.propertyName);
      }else{
        relationObject[relation.propertyName] = true
      }
    }

    return [schemaObject, relationObject];
  } catch (e) {
    throw e;
  }
};
/**
 This function can create ajv scheama by using typeorm enitity.
 **/
const getRelationSchema = async <T extends EntityTarget<T>>(
  model: T,
  baseModelName?: string,
  propertyName?: string
): Promise<{
  anyOf: {
    type: string;
    properties?: object;
    required?: string[];
    additionalProperties?: boolean
  }[]

}> => {
  try {
    //3. intialize empty schema object
    const schemaObject: {
      anyOf: {
        type: string;
        properties?: object;
        required?: string[];
        additionalProperties?: boolean
      }[]

    } = {
      anyOf: [
        {
          type: "object",
          properties: {},
          required: [],
          additionalProperties: false,
        }, {
          type: "boolean"
        }
      ]

    };
    //1. get the datasource object
    const appDataSource = await handler();
    const entityMetadata = appDataSource.getMetadata(model);
    const relations = entityMetadata.relations.map((relation) => {
      return {
        propertyName: relation.propertyName,
        relationType: relation.relationType,
        className: relation.inverseEntityMetadata.targetName,
      };
    });
    // const emptyObj: any = { type: "object", properties: {} };
    //3. loop through relations and crate a scheama for each relation entity
    if (relations.length) {
      for (const relation of relations) {
        if (baseModelName !== relation.className) {

          //a. get the scheama oject for that entity
          const data =
            await getRelationSchema(
              relation.className,
              baseModelName,
              relation.propertyName
            );

          schemaObject.anyOf.push({
            type: "object",
            properties: {
              [`${relation.propertyName}`]: data
            },
            required: [],
            additionalProperties: false,

          }, {
            type: "boolean",
          })

          //   //b. make it required
          //   schemaObject.required.push(relation.propertyName);
        } else {
          schemaObject.anyOf.push({
            type: "object",
            properties: {
              [`${relation.propertyName}`]: { type: "boolean", }
            },
            required: [],
            additionalProperties: false,

          }, {
            type: "boolean",
          })
        }
      }
    } else {
      schemaObject.anyOf.push({
        type: "object",
        properties: {
          [`${propertyName}`]: { type: "boolean", }
        },
        required: [],
        additionalProperties: false,

      }, {
        type: "boolean",
      })
    }
    return schemaObject;
  } catch (e) {
    return e;
  }
};

const validateRelationSchema = async <T extends EntityTarget<T>>(
  model: T,
  baseModelName?: string,
  propertyName?: string
): Promise<any> => {
  try {
    //1. get the datasource object
    const appDataSource = await handler();
    const entityMetadata = appDataSource.getMetadata(model);
    const relations = entityMetadata.relations.map((relation) => {
      return {
        propertyName: relation.propertyName,
        relationType: relation.relationType,
        className: relation.inverseEntityMetadata.targetName,
      };
    });
    // const emptyObj: any = { type: "object", properties: {} };
    //3. loop through relations and crate a scheama for each relation entity
    if (relations.length) {
      for (const relation of relations) {
        if (baseModelName !== relation.className) { }
      }
    }
  }
  catch (e) {

  }
}


export const getFilterSchema = <T extends EntityTarget<T>>(model: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //1. create filter scheama as per the model

      //3. intialize empty schema object
      const schemaObject: {
        type: "object";
        properties: object;
        required: string[];
      } = {
        type: "object",
        properties: {},
        required: [],
      };

      const appDataSource = await handler();
      const entityMetadata = appDataSource.getMetadata(model);
      //1. create select object
      const [schemaObject1, relationObject1] = await getWhereSchema(
        model,
        entityMetadata.targetName
      );
      // schemaObject["properties"]["relations"] = await getRelationSchema(
      //   model,
      //   entityMetadata.targetName
      // );
      //2. create relation object
      console.log(JSON.stringify(relationObject1));
      const validate = ajv.compile(schemaObject);
      const valid = validate({
        relations: {
          itemDescription: true,
          itemImage: true
        }
      });
      if (!valid) {
        throw validate.errors;
      }
      next();
    } catch (error) {
      res.status(422).json(error);
    }
  };
};
