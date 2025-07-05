import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../host";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${host}/api/messages`);
        const data = await response.json();
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black min-h-screen p-4 sm:p-6 md:p-10 text-white">
      {/* Header + Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 text-center md:text-left">
          User Messages
        </h1>
        <button
          onClick={() => navigate("/admin")}
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 px-5 py-2 rounded-md shadow-md text-white font-semibold"
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Messages */}
      {loading ? (
        <p className="text-center text-gray-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-400">No messages found.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="mb-2">
                <span className="font-semibold text-blue-300">Name:</span>{" "}
                {msg.name}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-blue-300">Email:</span>{" "}
                {msg.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-blue-300">Message:</span>{" "}
                {msg.message}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Received on:{" "}
                {new Date(msg.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminMessages;
