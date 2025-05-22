import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:4001/book", data);
      toast.success("Book added successfully!");
      navigate("/course");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        <span className="text-pink-500">+</span> Add New Book
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter book name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter book title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            {...register("price", { required: true })}
            type="number"
            step="0.01"
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">Price is required</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select category</option>
            <option value="Thrill">Thrill</option>
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Fantasy">Fantasy</option>
            
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            {...register("image", { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">Image URL is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md transition duration-200"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
