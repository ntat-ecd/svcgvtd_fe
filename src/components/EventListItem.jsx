import { useState } from "react";

function EventListItem({ event, authToken, onEventsChange }) {
  //State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold form data while editing

  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location:event.location,
    event_date: new Date(event.event_date).toISOString().slice(0, 16),
    thumbnail: event.thumbnail_url,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/events/${event.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authToken,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Update failed");
      setIsEditing(false); //Exit edit mode
      onEventsChange(); //What to do when finish editing
    } catch (error) {
      console.log("Update error:", error);
    }
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`http://localhost:3000/api/events/${event.id}`, {
          method: "DELETE",
          headers: { "x-auth-token": authToken },
        });
        onEventsChange();
      } catch (error) {
        console.log("Delete error: ", error);
      }
    }
  };
  //RENDER EDIT FORM
  if (isEditing) {
    return (
      <form
        onSubmit={handleUpdateSubmit}
        className="p-4 border border-rose-300 rounded-md bg-violet-50 space-y-3"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="datetime-local"
          name="event_date"
          value={formData.event_date}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  //RENDER STATIC DISPLAY
  return (
    <div className="flex items-center justify-between p-4 border border-rose-100 rounded-md">
      <div className="flex items-center space-x-4">
        <img
          src={event.thumbnail_url}
          alt={event.title}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-bold text-lg text-rose-900">{event.title}</h4>
          <p className="text-sm text-slate-500">
            {new Date(event.event_date).toLocaleString()}
          </p>
           <p className="text-sm text-slate-500">
            {event.location}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default EventListItem;
