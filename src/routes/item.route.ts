// src/routes/userRoutes.ts
import { Router } from "express";
import itemController from "../controllers/item.contoller";
import { authMiddleware } from "../middlewares/authMiddleware.middleware";
import { checkRequest } from "../middlewares";
import { Items } from "../schema";
import { BulkItems } from "../schema/schema.bulk";

const router = Router();

// Public route
router.get("/items", itemController.find);

// Protected route (requires authentication)
router.get("/items/:id", itemController.findById);

// Create new user
router.post("/items", checkRequest(BulkItems), itemController.create);

// Update user
router.put("/items/:id", itemController.updateById);

// Delete user
router.delete("/items/:id", itemController.deleteById);

export default router;
