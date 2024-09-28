// // src/routes/userRoutes.ts
// import { Router } from 'express';
// import * as userController from '../controllers/userController';
// import { authMiddleware } from '../middlewares/authMiddleware';
// const router = Router();
// // Public route
// router.get('/users', userController.find);
// // Protected route (requires authentication)
// router.get('/users/:id', authMiddleware, userController.findById);
// // Create new user
// router.post('/users', userController.create);
// // Update user
// router.put('/users/:id', authMiddleware, userController.updateById);
// // Delete user
// router.delete('/users/:id', authMiddleware, userController.deleteById);
// export default router;
