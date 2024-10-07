import { JSONSchemaType } from "ajv";
export const UserInquiry: JSONSchemaType<{
    name: string,
    email: string,
    mobile: string,
    message: string
}> = {
    type: "object",
    properties: {
        name: { type: "string", nullable: false },
        email: { type: "string", nullable: false },
        mobile: { type: "string", nullable: false },
        message: { type: "string", nullable: false },
    },
    required: ["name", "email", "mobile", "message"],
    additionalProperties: false,
};
