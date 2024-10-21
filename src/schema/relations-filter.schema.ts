import { JSONSchemaType } from "ajv";
import { RelationType } from "../types";
export let RelationsFilter: JSONSchemaType<RelationType> = {
    type: "object",
    properties: {
        name: {
            type: "string",
            nullable: true,
        },
        where: {
            type: "object",
            nullable: true,
        },
        fields: {
            type: "object",
            nullable: true,
        },
        relations: {
            type: "array",
            nullable: true,
            items: { $ref: "#" } as JSONSchemaType<RelationType>,        },
    },
    required: [],
    additionalProperties: false,
};
