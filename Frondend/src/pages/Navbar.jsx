import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import img1 from "../assets/images/logo.jpeg";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/validate-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setShowPopup(false);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white fixed w-full top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <img
              src={img1}
              alt="Logo"
              className="h-16 w-auto shadow-lg rounded-full"
            />
            <div className="text-2xl font-bold tracking-wide">
              <span className="text-white">HARVI</span>
              <span className="text-yellow-500 ml-2">TOOLS</span>
              <p className="text-sm text-gray-300 font-medium">SINCE 2019</p>
            </div>
          </div>

          {/* Hamburger Icon and Social Media Icons */}
          <div className="flex items-center space-x-4 lg:hidden">
            <a href="#" className="text-gray-400 hover:text-red-500">
              <i className="fab fa-youtube text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <button
              className="text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="/" className="text-sm font-bold hover:text-yellow-500">
              ABOUT
            </a>
            <a href="/product" className="text-sm font-bold hover:text-yellow-500">
              PRODUCTS
            </a>
            <a href="/business" className="text-sm font-bold hover:text-yellow-500">
              SERVICES
            </a>
            <a href="/contact" className="text-sm font-bold hover:text-yellow-500">
              CONTACT
            </a>
            <button
              onClick={() => setShowPopup(true)}
              className="text-sm font-bold hover:text-yellow-500"
            >
              DASHBOARD
            </button>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <i className="fab fa-youtube text-3xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <i className="fab fa-instagram text-3xl"></i>
            </a>
          </div>
        </div>

        {/* Dropdown Menu for Mobile */}
        {menuOpen && (
          <div className="bg-black lg:hidden flex flex-col space-y-2 py-4 px-6">
            <a href="/" className="text-sm font-bold hover:text-yellow-500">
              ABOUT
            </a>
            <a href="/product" className="text-sm font-bold hover:text-yellow-500">
              PRODUCTS
            </a>
            <a href="/business" className="text-sm font-bold hover:text-yellow-500">
              SERVICES
            </a>
            <a href="/contact" className="text-sm font-bold hover:text-yellow-500">
              CONTACT
            </a>
            <button
              onClick={() => setShowPopup(true)}
              className="text-sm font-bold hover:text-yellow-500 text-left"
            >
              DASHBOARD
            </button>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content cut-off */}
      <div className="pt-20"></div>

      {/* Popup for Admin Password */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Enter Admin Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Password"
                required
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPopup(false);
                    setError("");
                    setPassword("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;