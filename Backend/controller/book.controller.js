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

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log("Error fetching book: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// New function to get recommended books
export const getRecommendedBooks = async (req, res) => {
  try {
    // Get books marked as recommended, limit to 4
    const recommendedBooks = await Book.find({ isRecommended: true }).limit(4);
    res.status(200).json(recommendedBooks);
  } catch (error) {
    console.log("Error fetching recommended books: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addBook = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      image,
      title,
      isRecommended = false,
    } = req.body;

    if (!name || !price || !category || !image || !title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      name,
      price,
      category,
      image,
      title,
      isRecommended,
    });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.log("Error adding book: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, image, title, isRecommended } = req.body;

    // Validate required fields
    if (!name || !price || !category || !image || !title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find and update the book
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, price, category, image, title, isRecommended },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.log("Error updating book: ", error);
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
