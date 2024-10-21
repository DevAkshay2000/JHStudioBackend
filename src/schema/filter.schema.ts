import { JSONSchemaType } from "ajv";
import { RelationsFilter } from "./relations-filter.schema";
import { RelationType } from "../types";

export const FilterSchema: JSONSchemaType<{
  fields?: object;
  where?: object;
  relations?: RelationType[];
}> = {
  type: "object",
  properties: {
    fields: {
      type: "object",
      nullable: true,
    },
    where: {
      type: "object",
      nullable: true,
    },
    relations: {
      type: "array",
      items: RelationsFilter,
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};
