import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/utils.js";

const cartRouter = express.Router();

cartRouter.post("/addToCart", authMiddleware, addToCart);
cartRouter.post("/removeFromCart", authMiddleware, removeFromCart);
cartRouter.get("/getCart", authMiddleware, getCart);

export default cartRouter;
