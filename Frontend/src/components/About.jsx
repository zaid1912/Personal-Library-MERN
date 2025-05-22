import React from "react";

function About() {
  return (
    <div className="max-w-screen-lg container mx-auto px-4 py-16 dark:bg-slate-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">About Our Bookstore App</h1>
      <p className="mb-4 text-lg">
        Welcome to our Bookstore App — your personal digital library and book management system.
      </p>
      <p className="mb-4 text-lg">
        Our mission is to help you easily manage your collection of books, whether you own them or want to discover new titles. You can browse, add, and delete books effortlessly.
      </p>
      <p className="mb-4 text-lg">
        This app is built with modern technologies including React for the frontend, Node.js and Express for the backend, and MongoDB for database management.
      </p>
      <p className="mb-4 text-lg">
        Whether you're a casual reader or a book enthusiast, this app provides a simple and intuitive way to keep track of your favorite books and find new ones.
      </p>
      <p className="mb-4 text-lg">
        Thank you for using our app — happy reading!
      </p>
    </div>
  );
}

export default About;
