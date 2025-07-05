import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useVeryfy from "../utils/Verfy";
import { host } from "../host";

function Contact() {
  useVeryfy();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent to admin!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send: " + data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4 md:px-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row justify-around gap-10">
          {/* Customer Service */}
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" /> Customer Services
            </h2>
            <p>
              For inquiries, call us at:{" "}
              <span className="font-semibold text-blue-300">1-8000-123-4567</span>
            </p>
            <p>
              Or email us at:{" "}
              <span className="font-semibold text-blue-300">customerservice@gmail.com</span>
            </p>
          </div>

          {/* Branch Locations */}
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-400" /> Branch Locations
            </h2>
            <p>Visit one of our nearby branches:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Main Branch, Delhi</li>
              <li>Downtown Branch, Prayagraj</li>
              <li>Sector-9 Branch, Bhubaneswar</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">
            Send Us a Message
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center bg-black text-white py-4 px-6">
        <h1 className="text-sm md:text-base">
          © 2025 UBank. All rights reserved.
        </h1>
        <div className="flex gap-4 text-sm">
          <h2 className="cursor-pointer hover:underline">Privacy Policy</h2>
          <h2 className="cursor-pointer hover:underline">Terms & Services</h2>
          <h2 className="cursor-pointer hover:underline">Contact Us</h2>
        </div>
      </footer>
    </>
  );
}

export default Contact;
