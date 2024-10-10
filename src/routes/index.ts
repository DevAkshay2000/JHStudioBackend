const express = require('express');
import { Router } from "express";
import itemsRoute from "../routes/item.route"
import itemDescription from "../routes/item-description.route"
import itemImage from "../routes/item-images.route"
import descriptionType from "../routes/description-type.route"
import mailSender from "../routes/emails.route"
const router = Router();
// Route Middleware
router.use(itemsRoute);
router.use(itemDescription);
router.use(itemImage);
router.use(descriptionType);
router.use(mailSender);

export default router;
