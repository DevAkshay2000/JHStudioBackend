import { JSONSchemaType } from "ajv";
import { ItemDescription } from "../entities";
export const ItemDescriptions: JSONSchemaType<Omit<ItemDescription, "item">> = {
  type: "object",
  properties: {
    id: { type: "number" },
    label: { type: "string" },
    value: { type: "string" },
    modifiedDate: { type: "string", format: "date-time" },
    createdDate: { type: "string", format: "date-time" },
    revisionNumber: { type: "number" },
    itemId: { type: "number", nullable: true },
  },
  required: ["label"],
  additionalProperties: false,
};
