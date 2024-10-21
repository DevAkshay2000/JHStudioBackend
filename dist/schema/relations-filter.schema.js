"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsFilter = void 0;
exports.RelationsFilter = {
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
            items: { $ref: "#" },
            // items: {} as JSONSchemaType<RelationType>,
        },
    },
    required: [], // No required properties
    additionalProperties: false,
};
// Now update the relations.items to reference RelationsFilter
// Add a type assertion to confirm properties is defined
