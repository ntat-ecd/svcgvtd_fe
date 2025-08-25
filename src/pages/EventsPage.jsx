import { useState, useEffect } from "react";
import CountdownTimer from "../components/CountdownTimer";
function EventsPage() {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //FormatDate helper
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        console.log("data:", data);
        setFeaturedEvent(data[0]);
        console.log("featuredEvent set:", featuredEvent);
        setOtherEvents(data.slice(1));
      } catch (err) {
        setError(err.message || "An error occurred while fetching events");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-violet-50">
      <main className="container mx-auto px-6 py-16">
        {/* Featured Event */}
        {featuredEvent && (
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-800 mb-8 text-center">
              Coming Up Next
            </h2>
            <div className="grid md:grid-cols-5 gap-8 items-center bg-rose-900 p-8 rounded-lg shadow-xl">
              <div className="md:col-span-2">
                <img
                  src={featuredEvent.thumbnail_url}
                  alt={featuredEvent.title}
                  className="w-full h-auto object-cover rounded-md aspect-square"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-3xl font-bold text-rose-50 text-shadow-sky-800 mb-3">
                  {featuredEvent.title}
                </h3>
                <p className="text-gray-50 mb-4 font-medium">
                  {formatDate(featuredEvent.event_date)}
                </p>
                  <CountdownTimer targetDate={featuredEvent.event_date} />
                <p className="text-slate-200 mb-4 font-medium">
                  {featuredEvent.description}
                </p>
                <p className="text-gray-50 mb-4 font-semibold">
                  Location: {featuredEvent.location}
                </p>
              </div>
            </div>
          </section>
        )}
        {/* Other Events */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-8 text-center">
            All Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherEvents.length > 0 ? (
              otherEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-violet-50 rounded-lg shadow-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={event.thumbnail_url}
                    alt={event.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-rose-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-500 mb-3 text-sm font-medium">
                      {formatDate(event.event_date)}
                    </p>
                    <p className="text-slate-600 text-base flex-grow">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 col-span-full text-center">
                No other events scheduled at this time.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
export default EventsPage;
