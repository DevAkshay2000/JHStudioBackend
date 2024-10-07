// src/routes/userRoutes.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.middleware';
import decscriptionTypeController from '../controllers/decscription-type.controller';
import { checkRequest } from '../middlewares';
import { DescriptionTypes } from '../schema/description-type.schema';

const router = Router();

// Public route
router.get('/descriptions-types', decscriptionTypeController.find);

// Protected route (requires authentication)
router.get('/descriptions-types/:id', decscriptionTypeController.findById);

// Create new user
router.post('/descriptions-types', checkRequest(DescriptionTypes), decscriptionTypeController.create);

// Update user
router.put('/descriptions-types/:id', decscriptionTypeController.updateById);

// Delete user
router.delete('/descriptions-types/:id', decscriptionTypeController.deleteById);

export default router;
