import express from "express";
import searchItem from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/search", searchItem);

export default searchRouter;
