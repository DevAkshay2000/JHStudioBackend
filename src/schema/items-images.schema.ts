import { JSONSchemaType } from "ajv";
import { ItemDescription, ItemImage } from "../entities";
export const ItemImages: JSONSchemaType<Omit<ItemImage, "item">> = {
  type: "object",
  properties: {
    id: { type: "number" },
    url: { type: "string" },
    modifiedDate: { type: "string", format: "date-time" },
    createdDate: { type: "string", format: "date-time" },
    revisionNumber: { type: "number" },
    itemId: { type: "number", nullable: true },
  },
  required: ["url"],
  additionalProperties: false,
};
