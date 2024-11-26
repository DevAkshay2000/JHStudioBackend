"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var items_routes_1 = __importDefault(require("../modules/items/items.routes"));
var general_data_route_1 = __importDefault(require("../modules/general-data/general-data.route"));
var customer_routes_1 = __importDefault(require("../modules/customer/customer.routes"));
var feature_setting_routes_1 = __importDefault(require("../modules/fetaure-settings/feature-setting.routes"));
var user_routes_1 = __importDefault(require("../modules/auth/user.routes"));
var services_routes_1 = __importDefault(require("../modules/services/services.routes"));
var sale_header_routes_1 = __importDefault(require("../modules/sale-items/sale-header.routes"));
var service_session_routes_1 = __importDefault(require("../modules/service-session/service-session.routes"));
var taxes_routes_1 = __importDefault(require("../modules/taxes/taxes.routes"));
var purchase_routes_1 = __importDefault(require("../modules/purchase-items/purchase.routes"));
var supplier_routes_1 = __importDefault(require("../modules/suppliers/supplier.routes"));
exports.routes = [
    items_routes_1.default,
    general_data_route_1.default,
    customer_routes_1.default,
    feature_setting_routes_1.default,
    user_routes_1.default,
    services_routes_1.default,
    sale_header_routes_1.default,
    service_session_routes_1.default,
    taxes_routes_1.default,
    purchase_routes_1.default,
    supplier_routes_1.default
];
//# sourceMappingURL=routes.data.js.map