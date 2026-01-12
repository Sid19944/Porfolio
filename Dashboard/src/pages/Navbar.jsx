import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold">Portfolio</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#">Projects</a>
            <a href="#">Skills</a>
            
          </div>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden flex flex-col space-y-2 py-2">
            <a href="#">Projects</a>
            <a href="#">Skills</a>
            
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
