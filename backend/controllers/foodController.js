import path from "path";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  let image_filename = `${req.file.filename}`;
  const foodItem = new foodModel({
    name: name,
    description: description,
    price: price,
    category: category,
    image: image_filename,
  });
  try {
    await foodItem.save();
    return res.status(200).json({
      _id: foodItem._id,
      name: name,
      description: description,
      price: price,
      category: category,
      image: image_filename,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(201).json({ meesage: "Food items list", data: foods });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Item Removed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Internal server error" });
  }
};
export { addFood, listFood, removeFood };
