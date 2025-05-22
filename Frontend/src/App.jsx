import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import About from "./components/About"; // Import About component
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route
            path="/addbook"
            element={authUser ? <AddBook /> : <Navigate to="/signup" />}
          />
          <Route
            path="/edit/:id"
            element={authUser ? <EditBook /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} /> {/* New route */}
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
