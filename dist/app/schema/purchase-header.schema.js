"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseHeadersSchema = void 0;
exports.PurchaseHeadersSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
        },
        code: {
            type: "string",
        },
        txnDate: {
            type: "string",
        },
        totalAmount: {
            type: "integer",
        },
        totalDiscount: {
            type: "integer",
        },
        totalTax: {
            type: "integer",
        },
        createdDate: {
            type: "string",
            format: "date-time",
        },
        modifiedDate: {
            type: "string",
            format: "date-time",
        },
        supplier: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                },
            },
            required: ["id"],
            additionalProperties: false,
        },
        user: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                },
            },
            required: ["id"],
            additionalProperties: false,
        },
        paymentType: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                },
            },
            required: ["id"],
            additionalProperties: false,
        },
        purchaseLines: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    txnHeader: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                    service: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                    tax: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                        },
                        required: ["id"],
                        additionalProperties: false,
                    },
                    id: {
                        type: "integer",
                    },
                    amount: {
                        type: "integer",
                    },
                    quantity: {
                        type: "integer",
                    },
                    discountAmount: {
                        type: "integer",
                    },
                    taxAmount: {
                        type: "integer",
                    },
                    createdDate: {
                        type: "string",
                        format: "date-time",
                    },
                    modifiedDate: {
                        type: "string",
                        format: "date-time",
                    },
                },
                required: ["service", "amount", "createdDate", "modifiedDate", "tax", "quantity"],
                additionalProperties: false,
            },
        },
    },
    required: [
        "txnDate",
        "totalAmount",
        "createdDate",
        "modifiedDate",
        "supplier",
        "user",
        "paymentType",
        "purchaseLines",
    ],
    additionalProperties: false,
};
//# sourceMappingURL=purchase-header.schema.js.map