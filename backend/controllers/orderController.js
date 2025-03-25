import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const lineItems = req.body.items.map((item) => ({
      priceData: {
        currency: "usd",
        productData: {
          name: item.name,
        },
        unitAmount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      priceData: {
        currency: "usd",
        productData: {
          name: "Delivery Charges",
        },
        unitAmount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(201).json({ message: "", success_url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if ((success = "true")) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(201).json({ message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res
        .status(500)
        .json({ message: "an error occured while making payment" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.status(201).json({ message: "Data", data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const orderList = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.status(201).json({ message: "Data", data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.status(201).json({ message: "Status updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { placeOrder, verifyOrder, userOrder, orderList, updateStatus };
