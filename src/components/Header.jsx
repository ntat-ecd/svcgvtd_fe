import { useState } from "react";
import { Link } from "react-router-dom";
const Header = ({ authToken, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between bg-sky-800 p-4 text-white">
        <h1 className="text-xl font-bold">Catholic Student Hub</h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          id="menu-button"
          className="rounded bg-sky-700 p-2 hover:bg-sky-600 md:hidden"
        >
          Menu
        </button>
        {/*  Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/" className="rounded p-2 hover:bg-sky-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="rounded p-2 hover:bg-sky-700">
                Events
              </Link>
            </li>
            <li>
              <Link to="/about" className="rounded p-2 hover:bg-sky-700">
                About Us
              </Link>
            </li>
            {authToken ? (
              <li>
                <button
                  onClick={onLogout}
                  className="rounded p-2 hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="rounded p-2 hover:bg-sky-700">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-sky-800 p-4 text-white`}
      >
        <Link to="/" className="block p-4 hover:bg-sky-700">
          Home
        </Link>
        <Link to="/events" className="block p-4 hover:bg-sky-700">
          Events
        </Link>
        <Link to="/about" className="block p-4 hover:bg-sky-700">
          About us
        </Link>
        {authToken ? (
          <button
            onClick={onLogout}
            className="block w-full text-left p-4 hover:bg-red-500"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="block p-4 hover:bg-sky-700">
            Login
          </Link>
        )}
      </div>
    </>
  );
};
export default Header;
