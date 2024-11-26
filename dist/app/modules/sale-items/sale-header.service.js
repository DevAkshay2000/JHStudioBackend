"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_object_code_util_1 = require("../../utils/get-object-code.util");
var dbconfig_1 = require("../../config/dbconfig");
var sale_header_repo_1 = __importDefault(require("./sale-header.repo"));
var inventory_lines_entity_1 = require("./entities/inventory-lines.entity");
var send_invoice_mail_service_1 = __importDefault(require("../../services/send-invoice-mail.service"));
var customer_service_1 = __importDefault(require("../customer/customer.service"));
var item_stocks_entity_1 = require("./entities/item-stocks.entity");
var item_stocks_service_1 = __importDefault(require("./item-stocks.service"));
//1. find multiple records
var find = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sale_header_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [2 /*return*/, repo.find(filter)];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
//2. find single records
var findById = function (id, filter) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, respo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sale_header_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [4 /*yield*/, repo.findOneById(id, filter)];
            case 2:
                respo = _a.sent();
                return [2 /*return*/, respo];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
//3. create single record
var create = function (data_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([data_1], args_1, true), void 0, function (data, isService) {
        var repo, dataSource, itemStocksRepo, inventory_1, itemIds_1, invoiceItems_1, resultItemStock, itemStockResponse, respo, customer, error_3;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, (0, sale_header_repo_1.default)()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, (0, dbconfig_1.handler)()];
                case 2:
                    dataSource = _a.sent();
                    itemStocksRepo = dataSource.getRepository(item_stocks_entity_1.ItemStocks);
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(19, data)];
                case 3:
                    data = _a.sent();
                    inventory_1 = [];
                    itemIds_1 = [];
                    invoiceItems_1 = [];
                    if (!!isService) return [3 /*break*/, 6];
                    data.saleLines.forEach(function (value) {
                        var il = new inventory_lines_entity_1.InventoryLines();
                        (il.service = value.service),
                            (il.quantity = value.quantity),
                            (il.createdDate = value.createdDate),
                            (il.modifiedDate = value.modifiedDate);
                        inventory_1.push(il);
                        itemIds_1.push(value.service.id);
                        invoiceItems_1.push({
                            name: value.service.name,
                            quantity: value.quantity,
                            unitPrice: value.rate,
                            total: Number(value.amount + value.taxAmount),
                            tax: value.taxAmount,
                            taxName: value.tax.name,
                        });
                    });
                    data.inventoryLines = inventory_1;
                    return [4 /*yield*/, item_stocks_service_1.default.create(inventory_1, itemIds_1)];
                case 4:
                    resultItemStock = _a.sent();
                    itemStockResponse = itemStocksRepo.create(resultItemStock);
                    return [4 /*yield*/, itemStocksRepo.save(itemStockResponse)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, repo.create(__assign({}, data))];
                case 7:
                    respo = _a.sent();
                    return [4 /*yield*/, customer_service_1.default.findById(data.customer.id)];
                case 8:
                    customer = _a.sent();
                    return [4 /*yield*/, (0, send_invoice_mail_service_1.default)({
                            customer: customer.name,
                            txnDate: new Date(data.txnDate).toLocaleDateString(),
                            txnId: data.code,
                            mobile: customer.mobile,
                            subTotal: data.grandTotal,
                            tax: data.totalTax,
                            discount: data.totalDiscount,
                            email: customer.email,
                            itemData: invoiceItems_1,
                        })];
                case 9:
                    _a.sent();
                    return [2 /*return*/, respo];
                case 10:
                    error_3 = _a.sent();
                    throw error_3;
                case 11: return [2 /*return*/];
            }
        });
    });
};
//4. update single record by id
var updateById = function (id_1, data_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([id_1, data_1], args_1, true), void 0, function (id, data, isService) {
        var repo, inventory_2, respo, error_4;
        if (isService === void 0) { isService = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, sale_header_repo_1.default)()];
                case 1:
                    repo = _a.sent();
                    return [4 /*yield*/, (0, get_object_code_util_1.generateCode)(19, data)];
                case 2:
                    data = _a.sent();
                    inventory_2 = [];
                    if (!isService) {
                        data.saleLines.forEach(function (value) {
                            var il = new inventory_lines_entity_1.InventoryLines();
                            (il.service = value.service),
                                (il.quantity = value.quantity),
                                (il.createdDate = value.createdDate),
                                (il.modifiedDate = value.modifiedDate);
                            inventory_2.push(il);
                        });
                        data.inventoryLines = inventory_2;
                    }
                    return [4 /*yield*/, repo.updateById(id, __assign({}, data))];
                case 3:
                    respo = _a.sent();
                    return [2 /*return*/, respo];
                case 4:
                    error_4 = _a.sent();
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    });
};
//5. delete single record by id
var deleteById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sale_header_repo_1.default)()];
            case 1:
                repo = _a.sent();
                return [4 /*yield*/, repo.deleteById(id)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = { find: find, findById: findById, create: create, deleteById: deleteById, updateById: updateById };
//# sourceMappingURL=sale-header.service.js.map