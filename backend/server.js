import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import authRouter from "./routes/authRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config

dotenv.config();

const app = express();
const port = process.env.PORT;

// middleware

app.use(express.json());

app.use(cors());

// api endpoint

app.use("/api", foodRouter);
app.use("/api", authRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);

app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
  connectDb();
});
