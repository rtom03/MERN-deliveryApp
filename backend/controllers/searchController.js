import foodModel from "../models/foodModel.js";

const searchItem = async (req, res) => {
  try {
    const { word } = req.query;

    if (!word) {
      return res.status(400).json({ error: "Search term (word) is required." });
    }

    const regex = new RegExp(word, "i"); // case-insensitive search

    const query = {
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        // Try to match word to a number and compare it with price
        isNaN(Number(word)) ? {} : { price: Number(word) },
      ],
    };

    // Remove empty objects from $or array
    query.$or = query.$or.filter(
      (condition) => Object.keys(condition).length > 0
    );

    const results = await foodModel.find(query);

    res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Server error while searching." });
  }
};

export default searchItem;
