// src/routes/userRoutes.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.middleware';
import itemDescriptionController from '../controllers/item-description.controller';
import { checkRequest } from '../middlewares';
import { ItemDescriptions } from '../schema';

const router = Router();

// Public route
router.get('/item-descriptions', itemDescriptionController.find);

// Protected route (requires authentication)
router.get('/item-descriptions/:id', itemDescriptionController.findById);

// Create new user
router.post('/item-descriptions',checkRequest(ItemDescriptions), itemDescriptionController.create);

// Update user
router.put('/item-descriptions/:id', itemDescriptionController.updateById);

// Delete user
router.delete('/item-descriptions/:id', itemDescriptionController.deleteById);

export default router;
