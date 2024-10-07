// src/routes/userRoutes.ts
import { Router } from "express";
import emailController from "../controllers/emails.controller";
import { checkRequest } from "../middlewares";
import { UserInquiry } from "../schema";
const router = Router();

// // Public route
// router.get("/item-images", itemController.find);

// // Protected route (requires authentication)
// router.get("/item-images/:id", itemController.findById);

// Create new user
router.post("/user-enquiries", checkRequest(UserInquiry), emailController.create);

// // Update user
// router.put("/item-images/:id", itemController.updateById);

// // Delete user
// router.delete("/item-images/:id", itemController.deleteById);

export default router;
