import express from "express";
import {
  orderList,
  placeOrder,
  updateStatus,
  userOrder,
  verifyOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/utils.js";

const orderRouter = express.Router();

orderRouter.post("/placeOrder", authMiddleware, placeOrder);
orderRouter.post("/verifyOrder", verifyOrder);
orderRouter.post("/userOrder", authMiddleware, userOrder);
orderRouter.get("/listOrder", orderList);
orderRouter.post("/status", updateStatus);

export default orderRouter;
