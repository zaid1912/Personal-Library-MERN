// seedBooks.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const seedBooks = async () => {
  try {
    await mongoose.connect(URI);

    const books = [
      {
        name: "Atomic Habits",
        price: 25,
        category: "Self-Help",
        image: "https://example.com/atomic-habits.jpg",
        title: "Tiny Changes, Remarkable Results",
      },
      {
        name: "The Alchemist",
        price: 18,
        category: "Fiction",
        image: "https://example.com/the-alchemist.jpg",
        title: "A Fable About Following Your Dream",
      },
      {
        name: "Clean Code",
        price: 35,
        category: "Programming",
        image: "https://example.com/clean-code.jpg",
        title: "A Handbook of Agile Software Craftsmanship",
      },
    ];

    await Book.insertMany(books);
    console.log("✅ Books seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding books:", err);
    process.exit(1);
  }
};

seedBooks();
