import { NextFunction } from "express";
import { EntityTarget } from "typeorm";
import { Request, Response } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { FilterSchema } from "../schema";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

//2. validate relations

//1. validate params filter
export const validateRelationFilter = <T extends EntityTarget<T>>(model: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req?.query?.filter) {
                const validate = ajv.compile(FilterSchema);
                const valid = validate(JSON.parse(`${req.query.filter}`));
                if (!valid) {
                    throw validate.errors;
                }
            }

            next();
        } catch (error) {
            res.status(422).json(error);
        }
    };
};
