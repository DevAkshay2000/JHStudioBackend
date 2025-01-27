import { Routes } from "./routes.types";
import itemRoute from "../modules/items/items.routes";
import generalRoute from "../modules/general-data/general-data.route";
import customerRoute from "../modules/customer/customer.routes";
import featureSettingRoutes from "../modules/fetaure-settings/feature-setting.routes";
import userRoutes from "../modules/auth/user.routes";
import servicesRoutes from "../modules/services/services.routes";
import saleHeaderRoutes from "../modules/sale-items/sale-header.routes";
import serviceSessionRoutes from "../modules/service-session/service-session.routes";
import taxesRoutes from "../modules/taxes/taxes.routes";
import purchaseRoutes from "../modules/purchase-items/purchase.routes";
import supplierRoutes from "../modules/suppliers/supplier.routes";
import contactRoutes from "../modules/contacts/contact.routes";
import dashboardRoute from "../modules/reportroutes/dashboard.route";
import stockReportRoute from "../modules/reportroutes/stock-report.route";
import profitlossRoute from "../modules/reportroutes/profitloss.route";
import saleReportRoute from "../modules/reportroutes/sale-report.route";
import itemSaleRevenueRoute from "../modules/reportroutes/item-sale-revenue.route";
import serviceRevenueRoute from "../modules/reportroutes/service-revenue.route";


export const routes: Routes = [
  itemRoute,
  generalRoute,
  customerRoute,
  featureSettingRoutes,
  userRoutes,
  servicesRoutes,
  saleHeaderRoutes,
  serviceSessionRoutes,
  taxesRoutes,
  purchaseRoutes,
  supplierRoutes,
  contactRoutes,
  dashboardRoute,
  stockReportRoute,
  profitlossRoute,
  saleReportRoute,
  itemSaleRevenueRoute,
  serviceRevenueRoute
];
