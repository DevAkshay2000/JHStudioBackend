"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
var express_1 = require("express");
var item_contoller_1 = __importDefault(require("../controllers/item.contoller"));
var middlewares_1 = require("../middlewares");
var schema_bulk_1 = require("../schema/schema.bulk");
var router = (0, express_1.Router)();
// Public route
router.get("/items", item_contoller_1.default.find);
// Protected route (requires authentication)
router.get("/items/:id", item_contoller_1.default.findById);
// Create new user
router.post("/items", (0, middlewares_1.checkRequest)(schema_bulk_1.BulkItems), item_contoller_1.default.create);
// Update user
router.put("/items/:id", item_contoller_1.default.updateById);
// Delete user
router.delete("/items/:id", item_contoller_1.default.deleteById);
exports.default = router;
