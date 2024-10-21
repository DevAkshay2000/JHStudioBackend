// src/routes/userRoutes.ts
import { Router } from "express";
import itemController from "../controllers/item.contoller";
import { authMiddleware } from "../middlewares/authMiddleware.middleware";
import { checkRequest } from "../middlewares";
import { Items } from "../schema";
import { BulkItems } from "../schema/schema.bulk";
import {
  getModelSchema,
  validateRequestBody,
} from "../utils/getModelSchema.util";
import { Item } from "../entities";
import { getFilterSchema } from "../utils/getFilterSchema.util";
import { validateRelationFilter, validateRequestBodyFilter } from "../utils";

const router = Router();

// Public route
router.get("/items", validateRelationFilter(Item), itemController.find);

// Protected route (requires authentication)
router.get("/items/:id", validateRequestBody(Item), itemController.findById);

// Create new user
router.post("/items", checkRequest(BulkItems), itemController.create);

// Update user
router.put("/items/:id", itemController.updateById);

// Delete user
router.delete("/items/:id", itemController.deleteById);

export default router;
