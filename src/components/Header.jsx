import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header class="flex items-center justify-between bg-sky-800 p-4 text-white">
        <h1 class="text-xl font-bold">Catholic Student Hub</h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          id="menu-button"
          class="rounded bg-sky-700 p-2 hover:bg-sky-600 md:hidden"
        >
          Menu
        </button>
        {/*  Desktop Navigation */}
        <nav class="hidden md:block">
          <ul class="flex space-x-4">
            <li>
              <a href="#" class="rounded p-2 hover:bg-sky-700">
                Home
              </a>
            </li>
            <li>
              <a href="#" class="rounded p-2 hover:bg-sky-700">
                Events
              </a>
            </li>
            <li>
              <a href="#" class="rounded p-2 hover:bg-sky-700">
                About Us
              </a>
            </li>
            <li>
              <a href="#" class="rounded p-2 hover:bg-sky-700">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {/* Mobile Menu */}
      <div
        class={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-sky-800 p-4 text-white`}
      >
        <a href="#" className="block p-4 hover:bg-sky-700">
          Home
        </a>
        <a href="#" className="block p-4 hover:bg-sky-700">
          Events
        </a>
        <a href="#" className="block p-4 hover:bg-sky-700">
          About us
        </a>
        <a href="#" className="block p-4 hover:bg-sky-700">
          Contact
        </a>
      </div>
    </>
  );
};
export default Header;
