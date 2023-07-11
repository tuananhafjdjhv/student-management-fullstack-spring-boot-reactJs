import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const LogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate("/");
  }

  return (
    <nav className="fixed top-0 inset-x-0 bg-gray-900 py-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white font-bold text-xl">
            STUDENT MANAGEMENT
          </a>
        </div>
        <div className="relative">
          <button
            type="button"
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 7h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 7h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:block md:absolute md:right-0 bg-gray-700 mt-2 w-48 rounded-lg shadow-xl z-20`}
          >
            <a
              href="/"
              className="block px-4 py-2 text-white hover:bg-gray-600 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-white hover:bg-gray-600 transition-colors duration-300"
            >
              Students
            </a>
            <a
              href="/courses"
              className="block px-4 py-2 text-white hover:bg-gray-600 transition-colors duration-300"
            >
              Courses
            </a>
            <a
              onClick={LogOut}
              className="cursor-pointer block px-4 py-2 text-white hover:bg-gray-600 transition-colors duration-300"
            >
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
