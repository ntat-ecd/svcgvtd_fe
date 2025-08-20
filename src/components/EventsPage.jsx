import { useState, useEffect } from "react";
function EventsPage() {
  console.log("EventsPage component rendered");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching events");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <main className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-sky-800 mb-6">Upcoming Events</h2>
      {isLoading && <p className="text-gray-500">Loading events...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading &&
          !error &&
          events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-sky-800 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <p className="text-gray-500 mb-2">
                <strong>Date:</strong> {formatDate(event.event_date)}
              </p>
              <p className="text-gray-500">
                <strong>Location:</strong> {event.location}
              </p>
            </div>
          ))}
      </div>
    </main>
  );
}
export default EventsPage;
