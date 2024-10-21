import "reflect-metadata";
import { DataSource } from "typeorm";
import { DescriptionType, Item, ItemDescription, ItemImage } from "../../../entities";
import dotenv from "dotenv";
import path from "path";
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

export const initializeDataSource = async (): Promise<DataSource> => {
  let appDataSource: DataSource;

  appDataSource = new DataSource({
    type: "postgres",
    host: process.env.Host,
    port: Number(process.env.port),
    username: process.env.User_Name,
    password: process.env.Password,
    database: process.env.Database,
    entities: [Item, ItemImage, ItemDescription, DescriptionType],
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

  await appDataSource.initialize();
  return appDataSource;
};
