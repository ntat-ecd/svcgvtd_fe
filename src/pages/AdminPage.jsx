import { useState, useEffect } from "react";
function AdminPage({ authToken }) {
  //States for form fields and messages
  const [eventId, setEventId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event_date, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState(null);
  const [events, setEvents] = useState([]);

  //fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  //Clear form fields
  const clearForm = () => {
    setEventId(null);
    setTitle("");
    setDescription("");
    setEventDate("");
    setLocation("");
    setThumbnail(null);

    // A good practice is to also reset the file input visually
    document.getElementById("thumbnail").value = null;
  };
  //Handle Edit
  const handleEdit = (event) => {
    setEventId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(() => {
      console.log(event.event_date);
      const date = new Date(event.event_date).toISOString().slice(0, 16);
      console.log(date);
      return date;
    }); // Format for datetime-local input
    setLocation(event.location);
    setThumbnail(null); // Reset thumbnail to allow re-upload
    document.getElementById("thumbnail").value = null; // Reset file input
    setMessage("Editing event. Submit the form to save changes.");
  };

  //Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
          method: "DELETE",
          headers: {
            "x-auth-token": authToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to delete event");
        }
        setMessage("Event deleted successfully.");
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
      setMessage("Error deleting event. Please try again.");
    }
  };
  //Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("event_date", event_date);
    formData.append("location", location);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail || new Blob());
    }

    const method = eventId ? "PUT" : "POST";
    const url = eventId
      ? `http://localhost:3000/api/events/${eventId}`
      : "http://localhost:3000/api/events";
    setMessage("Submitting event data...");
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "x-auth-token": authToken,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to save event");
      }
  
      clearForm();
      setMessage(
        `Event ${eventId ? "updated" : "created"} successfully: ${data.title}`
      );
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      setMessage("Error saving event. Please try again.");
    }
  };
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-sky-800 mb-6">Admin Dashboard</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">
          {eventId ? "Edit Event" : "Create New Event"}
        </h3>
        {message && (
          <p className="bg-blue-100 text-blue-800 p-3 rounded mb-4">
            {message}
          </p>
        )}
        {/* Form fields for event creation/editing */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="event_Date" className="block text-gray-700 mb-2">
            Event Date and Time
          </label>
          <input
            type="datetime-local"
            id="event_Date"
            value={event_date}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-700 mb-2">
            Thumbnail Image
          </label>
          <input
            type="file"
            id="thumbnail"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/*a note for editing mode*/}
          {eventId && (
            <p className="text-sm text-gray-500 mt-1">
              Upload a new image to replace the existing one.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-sky-800 text-white p-3 rounded hover:bg-sky-700 transition-colors"
        >
          {eventId ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* Event List Section */}

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6">Manage Events</h3>
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-gray-500">No events available.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border rounded"
              >
                <h4 className="text-xl font-semibold text-sky-800 mb-2">
                  {event.title}
                </h4>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <p className="text-gray-500 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(event.event_date).toLocaleString()}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Location:</strong> {event.location}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default AdminPage;
