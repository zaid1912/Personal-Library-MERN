// book.route.js
import express from "express";
import {
  getBook,
  addBook,
  deleteBook,
  updateBook,
  getBookById,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.get("/:id", getBookById); // 👈 New route to get a single book by ID
router.post("/", addBook);
router.put("/:id", updateBook); // 👈 New route to update a book by ID
router.delete("/:id", deleteBook);

export default router;
