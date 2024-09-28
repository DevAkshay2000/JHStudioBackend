"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
var PORT = process.env.PORT || 3034;
app_1.default.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
