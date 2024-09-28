// src/app.ts
import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan"; // For logging requests
import cors from "cors"; // Enable Cross-Origin Resource Sharing
//**** import routes start 
import itemsRoute from "./routes/item.route";
import itemDescription from "./routes/item-description.route";
import itemImage from "./routes/item-images.route";

//**** import routes end 
//**** import middleware start 
import { appDataSource } from "./config/dbconfig";
import { errorHandler } from "./middlewares";
import { Item } from "./entities";
//**** import middleware end 
const app: Application = express();
//initialize database
appDataSource
    .initialize()
    .then(async () => {
        const metadata = appDataSource.getMetadata(Item);
        // console.log(metadata)
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

// Global Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Log HTTP requests in development mode

// Route Middleware
app.use(itemsRoute);
app.use(itemDescription);
app.use(itemImage);
// Error Handling Middleware
app.use(errorHandler); // Custom error handling

export default app;
