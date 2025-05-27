// seedRecommendedBooks.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const recommendedBooks = [
  {
    name: "To Kill a Mockingbird",
    price: 14.99,
    category: "Fiction",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    title: "A gripping tale of justice and morality",
    isRecommended: true,
  },
  {
    name: "Pride and Prejudice",
    price: 11.99,
    category: "Romance",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    title: "Jane Austen's beloved romance",
    isRecommended: true,
  },
];

const seedRecommendedBooks = async () => {
  try {
    await mongoose.connect(URI);

    const existingRecommended = await Book.find({ isRecommended: true });

    if (existingRecommended.length > 0) {
      console.log("✅ Recommended books already exist in the database.");
      process.exit(0);
    }

    await Book.insertMany(recommendedBooks);
    console.log("✅ Recommended books seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding recommended books:", err);
    process.exit(1);
  }
};

seedRecommendedBooks();
