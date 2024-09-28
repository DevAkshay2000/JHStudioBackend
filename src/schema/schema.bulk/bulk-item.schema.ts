import { ItemDescriptions, ItemImages, Items } from "../../schema"
export const BulkItems: any = {
    type: "object",
    properties: {
        item: Items,
        itemDescriptions: {
            type: 'array', items: ItemDescriptions,
        },
        itemImages: {
            type: 'array', items: ItemImages,
        },
    },

    required: ["item", "itemDescriptions", "itemImages"],
    additionalProperties: false,
};
