import { EntityTarget } from "typeorm";
import {
  City,
  Country,
  DFeatureType,
  DPaymentType,
  DUserType,
  Menus,
  States,
} from "../entities";

export const routeToEntityMap: {
  [key: string]: EntityTarget<any>;
} = {
  "/user-types": DUserType,
  "/feature-types": DFeatureType,
  "/payment-types": DPaymentType,
  "/cities": City,
  "/states": States,
  "/countries": Country,
  "/menus":Menus
};
