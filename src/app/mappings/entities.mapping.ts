import { EntitySchema, MixedList } from "typeorm";
import { Customer } from "../modules/customer/entities/customer.entity";
import {
  City,
  Country,
  DFeatureType,
  DPaymentType,
  DUserType,
  Menus,
  States,
} from "../modules/general-data/entities";
import { ItemDescription } from "../modules/items/entities/item-description.enity";
import { ItemImage } from "../modules/items/entities/item-images.entity";
import { Item } from "../modules/items/entities/items.entity";
import { FeatureSettings } from "../modules/fetaure-settings/entities/feature-setting.entity";
import { FeatureCodes } from "../modules/fetaure-settings/entities/feature-codes.entity";
import { UserSessions } from "../modules/auth/entities/user-sessions.entity";
import { Users } from "../modules/auth/entities/user.entity";
import { Services } from "../modules/services/entities/services.entity";
import { SaleHeaders } from "../modules/sale-items/entities/sale-header.entity";
import { SaleLines } from "../modules/sale-items/entities/sale-lines.enity";

export const entities:
  | MixedList<string | Function | EntitySchema<any>>
  | undefined = [
  Item,
  ItemImage,
  ItemDescription,
  City,
  Country,
  States,
  DUserType,
  DPaymentType,
  DFeatureType,
  Customer,
  FeatureSettings,
  Menus,
  FeatureCodes,
  UserSessions,
  Users,
  Services,
  SaleHeaders,
  SaleLines
];
