import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    // console.log(userData);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.body.userId });
    console.log(userData);
    let cartData = userData.cartData;

    if (cartData?.[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    } else {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(201).json({ message: "Item removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.body.userId });
    let cartData = await userData.cartData;
    res.status(201).json({ message: "cart items", cartData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addToCart, removeFromCart, getCart };
