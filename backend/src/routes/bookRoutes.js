import express from "express";
import multer from "multer";
import authenticateUser from "../middleware/authMiddleware.js";
import {createBook, deleteBook, getAllBooks, getBook, updateBook, uploadMiddleware, getBooksByUserId } from "../controllers/bookController.js";

const bookRoutes = express.Router();


bookRoutes.get("/", getAllBooks);
bookRoutes.get("/users/:userId", getBooksByUserId);
bookRoutes.get("/:id", getBook);
bookRoutes.post("/", authenticateUser,uploadMiddleware, createBook);
bookRoutes.put("/:id", authenticateUser,updateBook);
bookRoutes.delete("/:id", authenticateUser,deleteBook); 


export default bookRoutes;
