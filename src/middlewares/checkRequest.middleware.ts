// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
export const checkRequest = <T>(schema: JSONSchemaType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) {
        throw validate.errors;
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(422).json(error);
    }
  };
};
