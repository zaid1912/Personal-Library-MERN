'use client';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner from "../../public/Banner.png";

function Banner() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedBooks();
  }, []);

  const fetchRecommendedBooks = async () => {
    try {
      const response = await fetch("http://localhost:4001/book/recommended");
      if (response.ok) {
        const books = await response.json();
        setRecommendedBooks(books);
      } else {
        console.error("Failed to fetch recommended books");
      }
    } catch (error) {
      console.error("Error fetching recommended books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcome! Discover and manage your favorite{" "}
              <span className="text-pink-500">books every day!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Explore a collection of curated books, add new ones to your list,
              or remove what you no longer need. Whether you're a reader or a
              contributor, this platform is here to help you grow your personal
              library with ease and flexibility.
            </p>

            {/* Recommended Books Section */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">
                📚 Recommended Books
              </h2>

              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                </div>
              ) : recommendedBooks.length === 0 ? (
                <div className="text-center text-gray-600 bg-pink-50 border border-pink-200 rounded-lg p-6">
                  <p className="text-lg font-medium mb-2">No books recommended at the moment.</p>
                  <p className="text-sm">
                    Please check back later for new recommendations!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendedBooks.map((book) => (
                    <div
                      key={book._id}
                      className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-300 border"
                    >
                      <img
                        src={book.image}
                        alt={book.name}
                        className="w-full h-24 md:h-32 object-cover rounded-md mb-2"
                      />
                      <h3 className="font-semibold text-xs md:text-sm text-gray-800 truncate">
                        {book.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">
                        {book.category}
                      </p>
                      <p className="text-pink-500 font-bold text-sm">
                        ${book.price}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="btn mt-6 btn-secondary">
            <Link to="/course" className="text-white font-semibold">
              Get Started
            </Link>
          </button>
        </div>

        <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt="Banner"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
