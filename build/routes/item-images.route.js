"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
var express_1 = require("express");
var item_contoller_1 = __importDefault(require("../controllers/item.contoller"));
var router = (0, express_1.Router)();
// Public route
router.get("/item-images", item_contoller_1.default.find);
// Protected route (requires authentication)
router.get("/item-images/:id", item_contoller_1.default.findById);
// Create new user
router.post("/item-images", item_contoller_1.default.create);
// Update user
router.put("/item-images/:id", item_contoller_1.default.updateById);
// Delete user
router.delete("/item-images/:id", item_contoller_1.default.deleteById);
exports.default = router;
