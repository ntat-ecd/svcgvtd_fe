import { useState, useEffect } from "react";
function EventsPage() {
  const [featuredEvents, setFeaturedEvents] = useState(null);
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

        setFeaturedEvents(data[0]);
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
    <main className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-sky-800 mb-6">Upcoming Events</h2>
      {isLoading && <p className="text-gray-500">Loading events...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Featured Events */}

      {!isLoading && !error && featuredEvents && (
        <div className="mb-12 rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-3xl font-bold text-sky-800 mb-4">
            Coming Up Next
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src={featuredEvents.thumbnail_url}
              alt={featuredEvents.title}
              className="w-full h-auto object-cover rounded-md"
            />
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {featuredEvents.title}
              </h3>
              <p className="text-gray-500 mb-2">
                {formatDate(featuredEvents.event_date)}
              </p>
              <p className="text-gray-700 mb-4">{featuredEvents.description}</p>
              <p className="text-sm text-gray-600 font-semibold">
                {featuredEvents.location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Other Events */}

      {!isLoading && !error && featuredEvents && (
        <div className="mb-12 rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-3xl font-bold text-sky-800 mb-6">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherEvents.length > 0 ? (
              otherEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <img
                    src={event.thumbnail_url}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-bold text-xl text-sky-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 mb-2 text-sm">
                    {formatDate(event.event_date)}
                  </p>
                  <p className="text-gray-700 text-base">{event.description}</p>
                  {/* Add location if it exists */}
                </div>
              ))
            ) : (
              <p>No other events scheduled at this time.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
export default EventsPage;
