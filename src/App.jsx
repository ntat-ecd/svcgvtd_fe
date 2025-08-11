import { useState, useEffect } from "react";

import Header from "./components/Header";

function App() {
  //state for storing the list of events
  const [events, setEvents] = useState([]);
  //state for tracking loading status
  const [isLoading, setIsLoading] = useState(true);
  //state for storing error messages
  const [error, setError] = useState(null);
  //useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      //define the async function to fetch events
      try {
        //fetch data from the API
        const response = await fetch("http://localhost:3000/api/events");
        //check if the response is ok
        if (!response.ok) {
          throw new Error("Data could not be fetched");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []); //empty dependency array means this runs once when the component mounts
  //helper function to format event date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <>
      <div className=" bg-gray-100 min-h-screen">
        <Header />
        <main className="p-4">
          <h2 className="text-3xl font-bold text-sky-800 m-4">Upcoming Events</h2>
          {isLoading && <p className="text-gray-500">Loading events...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading &&
              !error &&
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-sky-700">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="text-gray-500">
                    Date: {formatDate(event.event_date)}
                  </p>
                  <p className="text-gray-500">Location: {event.location}</p>
                </div>
              ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
