import React, { useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-green-400">FileChat AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">Home</Link>
            <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-green-400 transition-colors">How it Works</a>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-black px-6 py-2 rounded-lg font-semibold hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/20" onClick={()=>navigate('/chat')}>
              Get Started
            </button>
            <Link to="/auth" className="text-gray-300 hover:text-green-400 transition-colors">Login</Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-green-400 hover:text-green-300 focus:outline-none">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 pb-4">
            <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-green-400 transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-green-400 transition-colors">Pricing</a>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-black px-6 py-2 rounded-lg font-semibold hover:from-green-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/20">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
