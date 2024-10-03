"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan")); // For logging requests
var cors_1 = __importDefault(require("cors")); // Enable Cross-Origin Resource Sharing
//**** import routes start
var item_route_1 = __importDefault(require("./routes/item.route"));
var item_description_route_1 = __importDefault(require("./routes/item-description.route"));
var item_images_route_1 = __importDefault(require("./routes/item-images.route"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
//**** import routes end
//**** import middleware start
// import { appDataSource } from "./config/dbconfig";
var middlewares_1 = require("./middlewares");
//**** import middleware end
var app = (0, express_1.default)();
//initialize database
// appDataSource
//   .initialize()
//   .then(async () => {
//     // console.log(metadata)
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });
// Global Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json());
// Parse incoming JSON requests
app.use((0, morgan_1.default)("dev")); // Log HTTP requests in development mode
app.get("/", function (req, res) {
    res.json({
        host: process.env.Host,
        port: Number(process.env.port),
        username: process.env.User_Name,
        password: process.env.Password,
        database: process.env.Database,
    });
    // res.send(`
    //   <html>
    //     <head>
    //       <title>Welcome to My E-commerce</title>
    //       <style>
    //         body {
    //           font-family: Arial, sans-serif;
    //           text-align: center;
    //           margin-top: 50px;
    //         }
    //         h1 {
    //           color: #2c3e50;
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       <h1>Welcome to KFT Foods E-commerce!</h1>
    //       <p>This is the home page of your application.</p>
    //       <p>Enjoy your stay!</p>
    //     </body>
    //   </html>
    // `);
});
// Route Middleware
app.use(item_route_1.default);
app.use(item_description_route_1.default);
app.use(item_images_route_1.default);
// Error Handling Middleware
app.use(middlewares_1.errorHandler); // Custom error handling
exports.default = app;
