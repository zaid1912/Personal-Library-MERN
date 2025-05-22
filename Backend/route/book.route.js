// book.route.js
import express from "express";
import { getBook, addBook, deleteBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/", addBook);
router.delete("/:id", deleteBook); // 👈 New route to delete a book by ID

export default router;
