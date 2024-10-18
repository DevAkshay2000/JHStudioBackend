import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import path from "path";
import { registerRoutes } from "./routes/routes";
import { DataSource } from "typeorm";
import { initializeDataSource } from "./config/dbconfig";
/**
 * Start logic
 */
let dataSource: DataSource;
export const startServer = async () => {
    try {
        const app = express();
        /**
         * Start the server on specified port
         */
        const { PORT, NODE_ENV } = process.env;
        /**
         * Establish DB connections here
         */
        dataSource = await initializeDataSource()

        /**
         * Register All the routes here
         */
        registerRoutes(app);

        if (NODE_ENV === 'production') {
            const privateKey = fs.readFileSync(
                path.join(__dirname, "..", "ssl", "private_key.pem"),
                "utf8"
            );
            const certificate = fs.readFileSync(
                path.join(__dirname, "..", "ssl", "cert.pem"),
                "utf8"
            );

            const credentials = {
                key: privateKey,
                cert: certificate,
            };
            const httpsServer = https.createServer(credentials, app);

            httpsServer.listen(PORT || 3000, () => {
                console.log(`HTTPS SERVER STARTED ON PORT: ${PORT || 3000}`);
            });
        } else {
            const httpServer = http.createServer(app);
            httpServer.listen(PORT || 3000, () => {
                console.log(`HTTP SERVER STARTED ON PORT: ${PORT || 3000}`);
            });
        }
    } catch (error) {
        /**
         * Any error during startup process
         * leads to exit of the program
         */
        console.log("Couldn't start the server")
        process.exit(-1);

    }
};

process.on("SIGINT", () => {
    /**
     * Close DB connections
     */
});

export { dataSource }
