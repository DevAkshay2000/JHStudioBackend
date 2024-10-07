// src/routes/userRoutes.ts
import { Router } from "express";
import itemController from "../controllers/item.contoller";
import { authMiddleware } from "../middlewares/authMiddleware.middleware";
import itemImagesController from "../controllers/item-images.controller";

const router = Router();

// Public route
router.get("/item-images", itemImagesController.find);

// Protected route (requires authentication)
router.get("/item-images/:id", itemImagesController.findById);

// Create new user
router.post("/item-images", itemImagesController.create);

// Update user
router.put("/item-images/:id", itemImagesController.updateById);

// Delete user
router.delete("/item-images/:id", itemImagesController.deleteById);

export default router;
