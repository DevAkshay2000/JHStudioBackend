
import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { handler } from "../config/dbconfig";
import { EntityTarget } from "typeorm";
import { typeOrmToAjvTypesMapping } from "../mappings";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const createFieldsScheama = async <T extends EntityTarget<T>>(
    model: T
): Promise<{
    type: "object";
    properties: object;
    required: string[];
}> => {
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

        modelProperties.forEach((value) => {
            //1. get the type according to the name
            schemaObject["properties"][value.name] = {
                type: "boolean",
            };
        });
        return schemaObject
    } catch (error) {
        return error
    }
}
/** this function can validate req body agains the schema*/
export const validateRequestBodyFilter = <T extends EntityTarget<T>>(model: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            //1. get the datasource object
            const appDataSource = await handler();
            const schemaObject = await createFieldsScheama(model)

            console.log(schemaObject)
            const validate = ajv.compile(schemaObject);
            const valid = validate(req.body);
            if (!valid) {
                throw validate.errors;
            }
            console.log(valid)
            next();
        } catch (error) {
            res.status(422).json(error);
        }
    };
};