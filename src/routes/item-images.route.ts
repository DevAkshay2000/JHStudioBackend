// src/routes/userRoutes.ts
import { Router } from "express";
import itemController from "../controllers/item.contoller";
import { authMiddleware } from "../middlewares/authMiddleware.middleware";

const router = Router();

// Public route
router.get("/item-images", itemController.find);

// Protected route (requires authentication)
router.get("/item-images/:id", itemController.findById);

// Create new user
router.post("/item-images", itemController.create);

// Update user
router.put("/item-images/:id", itemController.updateById);

// Delete user
router.delete("/item-images/:id", itemController.deleteById);

export default router;
