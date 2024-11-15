import { Routes } from "./routes.types";
import itemRoute from "../modules/items/items.routes";
import generalRoute from "../modules/general-data/general-data.route";
import customerRoute from "../modules/customer/customer.routes";
import featureSettingRoutes from "../modules/fetaure-settings/feature-setting.routes";
import userRoutes from "../modules/auth/user.routes";
import servicesRoutes from "../modules/services/services.routes";
import saleHeaderRoutes from "../modules/sale-items/sale-header.routes";
import serviceSessionRoutes from "../modules/service-session/service-session.routes";

export const routes: Routes = [
  itemRoute,
  generalRoute,
  customerRoute,
  featureSettingRoutes,
  userRoutes,
  servicesRoutes,
  saleHeaderRoutes,
  serviceSessionRoutes
];
