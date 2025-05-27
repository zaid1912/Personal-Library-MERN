import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4001/book");
      setBook(res.data);
      setFilteredBooks(res.data); // Initialize filtered books
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  // Get unique categories from the books
  const categories = ["all", ...new Set(book.map(item => item.category).filter(Boolean))];

  // Filter books based on search term and category
  useEffect(() => {
    let filtered = book;

    // Filter by search term (title, name, or author if available)
    if (searchTerm) {
      filtered = filtered.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory, book]);

  const handleDeleteBook = (id) => {
    setBook((prevBooks) => prevBooks.filter((book) => book._id !== id));
    setFilteredBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-8">
        {/* Hero Section */}
        <div className="mt-20 mb-16">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                We're delighted to have you{" "}
                <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                  Here! :)
                </span>
              </h1>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Discover amazing books and expand your knowledge with our curated collection
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/addbook">
                <button className="group relative px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Book
                </button>
              </Link>
              
              <Link to="/">
                <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        {!loading && book.length > 0 && (
          <div className="mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 pl-12 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="Search by title, name, or author..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Category Filter */}
                {categories.length > 1 && (
                  <div className="w-full md:w-1/4">
                    <select
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Clear Filters Button */}
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear
                  </button>
                )}
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Showing {filteredBooks.length} of {book.length} books
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-medium">
                  {loading ? "Loading..." : `${book.length} Books Available`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              <p className="text-slate-600 dark:text-slate-300">Loading amazing books...</p>
            </div>
          </div>
        ) : filteredBooks.length === 0 && book.length > 0 ? (
          // No search results found
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No Books Found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                We couldn't find any books matching your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Show All Books
              </button>
            </div>
          </div>
        ) : book.length === 0 ? (
          // No books in database
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No Books Found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">Be the first to add a book to the collection!</p>
              <Link to="/addbook">
                <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Add First Book
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((item, index) => (
              <div
                key={item._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Cards item={item} onDelete={handleDeleteBook} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Course;