import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className= "items-center p-4">
      <h1>Welcome to the Catholic Student Hub</h1>
      <p>This is the landing page. We will style it later.</p>
      <Link
        to="/events"
        className="block mt-2 text-lg text-sky-800 hover:text-sky-600 transition-colors"
      >
        View Upcoming Events
      </Link>
    </div>
  );
};

export default LandingPage;
