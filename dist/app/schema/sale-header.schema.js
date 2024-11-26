"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleHeadersSchema = void 0;
exports.SaleHeadersSchema = {
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
        subTotal: {
            type: "integer",
        },
        grandTotal: {
            type: "integer",
        },
        totalDiscount: {
            type: "integer",
        },
        totalTax: {
            type: "integer",
        },
        isInactive: {
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
        customer: {
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
        saleLines: {
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
                            name: {
                                type: "string",
                            }
                        },
                        required: ["id", "name"],
                        additionalProperties: false,
                    },
                    tax: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                            },
                            name: {
                                type: "string",
                            },
                            percentage: {
                                type: "integer",
                            }
                        },
                        required: ["id", "name"],
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
                    rate: {
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
                required: ["service", "amount", "createdDate", "modifiedDate", "tax", "quantity", "rate"],
                additionalProperties: false,
            },
        },
    },
    required: [
        "txnDate",
        "grandTotal",
        "createdDate",
        "modifiedDate",
        "customer",
        "user",
        "paymentType",
        "saleLines",
    ],
    additionalProperties: false,
};
//# sourceMappingURL=sale-header.schema.js.map