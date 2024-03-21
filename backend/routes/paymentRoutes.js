import express from "express";
import {
  cancelSubscription,
  createSubscription,
  getPrice,
  subscriptionUpdate,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/cancel-subscription", protect, cancelSubscription);
router.post("/create-subscription", protect, createSubscription);
router.patch("/updateSubscription", protect, subscriptionUpdate);
router.post("/getPrice", getPrice);

export default router;
