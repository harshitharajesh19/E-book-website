import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const wishlistRoutes = express.Router();

wishlistRoutes.post("/", authenticateUser, addToWishlist);
wishlistRoutes.get("/", authenticateUser, getWishlist);
wishlistRoutes.delete("/:bookId", authenticateUser, removeFromWishlist);

export default wishlistRoutes;
