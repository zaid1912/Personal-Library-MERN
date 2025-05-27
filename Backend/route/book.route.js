// book.route.js
import express from "express";
import {
  getBook,
  addBook,
  deleteBook,
  updateBook,
  getBookById,
  getRecommendedBooks,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.get("/recommended", getRecommendedBooks); // 👈 New route for recommended books
router.get("/:id", getBookById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
