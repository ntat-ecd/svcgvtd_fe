import { useState, useEffect } from "react";
import EventListItem from "../components/EventListItem";
function AdminPage({ authToken }) {
  //STATES FOR 'CREATE NEW EVENT' FORM

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event_date, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState(null);

  //STATE FOR THE LIST OF EVENTS
  const [events, setEvents] = useState([]);

  //DATA FETCHING

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://svcgvtd-be.onrender.com/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  //FORM HELPERS
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setEventDate("");
    setLocation("");
    setThumbnail(null);
    document.getElementById("thumbnail").value = null;
  };

  //HANDLERS
  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("Creating new event. Fill the form and submit.");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("event_date", event_date);
    formData.append("location", location);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail || new Blob());
    }
    try {
      const response = await fetch("https://svcgvtd-be.onrender.com/api/events", {
        method: "POST",
        headers: {
          "x-auth-token": authToken,
        },
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || "Failed to create event");
      }

      setMessage("Event created successfully.");
      clearForm();
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage("Error creating event. Please try again.");
    }
  };

  return (
    <div className="bg-violet-50 min-h-screen p-8">
      <main className="container mx-auto">
        <h2 className="text-4xl font-bold text-rose-900 mb-8">
          Admin Dashboard
        </h2>
        <section className="bg-white p-8 rounded-lg shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-rose-800 mb-6">
            Create New Event
          </h3>
          {message && (
            <p className="bg-blue-100 text-blue-800 p-3 rounded mb-4">
              {message}
            </p>
          )}
          <form
            onSubmit={handleCreate}
            className="bg-white p-8 rounded-lg max-w-2xl mx-auto"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 mb-2 font-medium"
              >
                Event Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 mb-2 font-medium"
              >
                Event Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 mb-2 font-medium"
              >
                Event Description
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="event_date"
                className="block text-gray-700 mb-2 font-medium"
              >
                Event Date
              </label>
              <input
                type="datetime-local"
                name="event_date"
                id="event_date"
                value={event_date}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="thumbnail"
                className="block text-gray-700 mb-2 font-medium"
              >
                Event Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.files[0])}
                required
                className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-700 text-white font-bold py-3 px-6 rounded-md hover:bg-rose-800 transition-colors"
            >
              Create Event
            </button>
          </form>
        </section>

        {/* MANAGE EVENTS LIST */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-rose-800 mb-6">
            Manage Existing Events
          </h3>
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-gray-500">No events available.</p>
            ) : (
              events.map((event) => (
                <EventListItem
                  key={event.id}
                  event={event}
                  authToken={authToken}
                  onEventsChange={fetchEvents}
                />
              ))
            )}
          </div>
        </section>
        <div className="bg-white p-8 rounded-lg shadow-md"></div>
      </main>
    </div>
  );
}
export default AdminPage;
