import "reflect-metadata";
import { DataSource } from "typeorm";

import dotenv from "dotenv";
import path from "path";
import { Item } from "../../modules/items/entities/items.entity";
import { ItemImage } from "../../modules/items/entities/item-images.entity";
import { ItemDescription } from "../../modules/items/entities/item-description.enity";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });
let appDataSource: DataSource;

const initializeDataSource = async (): Promise<DataSource> => {
  if (!appDataSource) {
    appDataSource = new DataSource({
      type: "postgres",
      host: process.env.Host,
      port: Number(process.env.port),
      username: process.env.User_Name,
      password: process.env.Password,
      database: process.env.Database,
      entities: [Item, ItemImage, ItemDescription],
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
  }
  return appDataSource;
};
export const handler = async (): Promise<DataSource> => {
  const dataSource = await initializeDataSource();
  return dataSource;
};
