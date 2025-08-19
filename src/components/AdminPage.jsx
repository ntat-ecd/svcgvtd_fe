import { useState } from "react";
function AdminPage({ authToken }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event_date, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const eventData = {
      title,
      description,
      event_date,
      location,
    };
    try {
      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify(eventData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }
      setMessage("Event created successfully!");
      //Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setEventDate("");
      setLocation("");
    } catch (err) {
      setMessage(err.message || "An error occurred while creating the event");
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
          Create New Event
        </h3>
        {message && (
          <p className="bg-blue-100 text-blue-800 p-3 rounded mb-4">
            {message}
          </p>
        )}
   
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
        <button
          type="submit"
          className="w-full bg-sky-800 text-white p-3 rounded hover:bg-sky-700 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
export default AdminPage;