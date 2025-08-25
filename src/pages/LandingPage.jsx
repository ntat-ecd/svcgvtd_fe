import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="bg-violet-50">
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT COL */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-rose-900 leading-tight mb-6">
              Help nurture the next <em className="text-red-700">radiant</em>{" "}
              generation
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Together, we help students shine in Faith, grow in Friendship,
              deepen Intellect, strengthen Character, and live out Mission.
            </p>
            <Link
              to="/events"
              className="inline-block bg-rose-700 text-white font-bold py-3 px-8 rounded-md hover:bg-rose-800 transition-colors"
            >
              View Projects →
            </Link>
          </div>
          {/* RIGHT COL */}
          <div className="flex justify-center">
            <img
              src="/hero-image.JPG"
              alt="How're helping"
              className="rounded-lg shadow-2xl w-full max-w-md"
            />
          </div>
        </div>
      </main>

      {/*  STATISTICS BAR  */}
      <section className="bg-rose-800 text-white">
        <div className="container h-full mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">10+</p>
            <p className="text-rose-200">YEARS OF MISSION</p>
          </div>
          <div>
            <p className="text-4xl font-bold">1000+</p>
            <p className="text-rose-200">STUDENTS SERVED</p>
          </div>
          
          <div>
            <p className="text-4xl font-bold">15+</p>
            <p className="text-rose-200">EVENTS PER YEAR</p>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
