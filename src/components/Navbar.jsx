import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#A37A5C] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">Logo</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-amber-200 transition-colors duration-200">
              Home
            </a>
            <a href="/chat" className="hover:text-amber-200 transition-colors duration-200">
              Chat
            </a>
              {/*<Link to='/assignments' className="hover:text-amber-200 transition-colors duration-200">
              Assignments
            </Link>
             <Link to='/test-platform' className="hover:text-amber-200 transition-colors duration-200">
              Online Test
            </Link>
             <Link to='/Academics-page-subjects' className="hover:text-amber-200 transition-colors duration-200">
              Academics
            </Link>
             <Link to='/reviews' className="hover:text-amber-200 transition-colors duration-200">
              Reviews
            </Link>
             <Link to='/contact' className="hover:text-amber-200 transition-colors duration-200">
              Contact Us
            </Link>
             <Link to='/elibrary' className="hover:text-amber-200 transition-colors duration-200">
             E-Library
            </Link>
             <Link to='/q-paper' className="hover:text-amber-200 transition-colors duration-200">
             Question papers
            </Link> */}
          </div>

        {/* hidden by default and visible for screen sizes above medium */}
          <div className="hidden md:block">
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              onClick={() => navigate("/auth")}>
              Log In
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-amber-200 focus:outline-none focus:text-amber-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
        // md:hidden means its hidden by default for screen sizes above medium 
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-amber-900 rounded-lg mt-2">
              <a
                href="#"
                className="block px-3 py-2 text-white hover:text-amber-200 hover:bg-amber-800 rounded-md transition-colors duration-200"
              >
                Home
              </a>
              {/* <a
                href="#"
                className="block px-3 py-2 text-white hover:text-amber-200 hover:bg-amber-800 rounded-md transition-colors duration-200"
              >
                Assignments
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-white hover:text-amber-200 hover:bg-amber-800 rounded-md transition-colors duration-200"
              >
                Reviews
              </a> */}
              <div className="pt-2">
                <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200" onClick={() => navigate("/auth")}>
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;