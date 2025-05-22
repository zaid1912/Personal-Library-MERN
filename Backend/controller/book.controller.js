// book.controller.js
import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const addBook = async (req, res) => {
  try {
    const { name, price, category, image, title } = req.body;

    if (!name || !price || !category || !image || !title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({ name, price, category, image, title });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.log("Error adding book: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting book: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
