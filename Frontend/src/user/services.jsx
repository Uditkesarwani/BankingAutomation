import React from "react";
import girl2 from "../assets/images/girl2.jpeg";
import useVeryfy from "../utils/Verfy";
import { FaShieldAlt, FaBolt, FaUserFriends } from "react-icons/fa";

function About() {
  useVeryfy();

  return (
    <>
      <section className="py-10 px-6 text-center bg-gradient-to-b from-white to-gray-100">
        <h1 className="text-4xl font-bold mb-2 text-blue-900">About Us</h1>
        <p className="text-gray-600 tracking-wide mb-6">
          Empowering your financial journey — one smart transaction at a time.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 mt-10">
          <img
            src={girl2}
            alt="Banking Illustration"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />

          <div className="max-w-2xl text-left space-y-4">
            <p className="text-gray-700 tracking-wide leading-relaxed">
              Our Banking Automation System revolutionizes traditional banking
              by streamlining operations and minimizing manual tasks. We bring
              you a seamless digital experience with top-tier security,
              real-time transaction tracking, and effortless account management.
            </p>
            <p className="text-gray-700 tracking-wide leading-relaxed">
              Whether you're transferring funds, checking balances, or opening
              new accounts, our platform is designed to save you time and give
              you peace of mind. With an intuitive interface and powerful
              backend, we help both users and institutions thrive in a fast-paced
              digital economy.
            </p>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">Why Choose Us?</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-md p-6 rounded-xl w-72 text-center">
              <FaShieldAlt className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Secure & Trusted</h3>
              <p className="text-sm mt-2 text-gray-600">
                End-to-end encryption and advanced authentication ensure your data is always safe.
              </p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-xl w-72 text-center">
              <FaBolt className="text-4xl text-yellow-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Fast & Efficient</h3>
              <p className="text-sm mt-2 text-gray-600">
                Instantly manage transactions, track expenses, and get real-time updates.
              </p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-xl w-72 text-center">
              <FaUserFriends className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">User Friendly</h3>
              <p className="text-sm mt-2 text-gray-600">
                Designed for all users — simple, clean interface for hassle-free navigation.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-blue-600 text-white py-10 px-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Future of Banking Today</h2>
          <p className="mb-6 text-base md:text-lg">
            Experience secure, smart, and speedy banking like never before. Start your journey with UBank now!
          </p>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center bg-black text-white py-4 px-6 mt-10">
        <h1 className="text-sm md:text-base">© 2025 UBank. All rights reserved.</h1>
        <div className="flex gap-4 text-sm">
          <h2 className="cursor-pointer hover:underline">Privacy Policy</h2>
          <h2 className="cursor-pointer hover:underline">Terms & Services</h2>
          <h2 className="cursor-pointer hover:underline">Contact Us</h2>
        </div>
      </footer>
    </>
  );
}

export default About;
