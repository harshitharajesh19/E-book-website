import express from "express";
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "../controllers/bookController.js";

const bookRoutes = express.Router();

bookRoutes.get("/", getAllBooks);
bookRoutes.post("/", createBook);
bookRoutes.get("/:id", getBook);
bookRoutes.put("/:id", updateBook);
bookRoutes.delete("/:id", deleteBook); 

export default bookRoutes;

