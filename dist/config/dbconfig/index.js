"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var entities_1 = require("../../entities");
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.Host,
    port: Number(process.env.Port),
    username: process.env.User_Name,
    password: process.env.Password,
    database: process.env.Database,
    entities: [entities_1.Item, entities_1.ItemImage, entities_1.ItemDescription],
    //   entities: [
    //     "../../../src/entities/index/**/*.{ts,js}",
    //     "../../../build/entities/**/*.{ts,js}",
    //   ],
    synchronize: true,
    logging: false,
    ssl: {
        rejectUnauthorized: false, // Disables SSL certificate verification
    },
});
