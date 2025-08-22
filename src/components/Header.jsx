import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header className="bg-gray-50">
      {/* Optional Top Banner from template */}
      <div className="bg-rose-900 text-center text-white text-sm py-1">
        <span>
          This banner can be used to inform visitors of something important.{" "}
          <a href="#" className="underline">
            Learn more
          </a>
        </span>
      </div>

      <nav className="container mx-auto px-6 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="SVCG VungThuDuc Logo" className="h-18 w-auto" />
          <span className="text-sm font-bold text-rose-900">
            Catholic Students of Thu Duc Region
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to="/" className="text-gray-700 hover:text-rose-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/events" className="text-gray-700 hover:text-rose-900">
              Events
            </Link>
          </li>
          <li>
            <Link to="#" className="text-gray-700 hover:text-rose-900">
              Donation
            </Link>
          </li>
          <li>
            <Link to="#" className="text-gray-700 hover:text-rose-900">
              Contact us
            </Link>
          </li>
        </ul>

        <a
          href="https://fb.com/svcgvungthuduc"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block bg-rose-900 text-white font-bold py-2 px-6 rounded-md hover:bg-rose-700 transition-colors"
        >
          JOIN →
        </a>

        {/* for a mobile menu button can be added later */}
        <div className="md:hidden">
          <button>{/* Mobile menu icon (e.g., SVG) would go here */}</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
