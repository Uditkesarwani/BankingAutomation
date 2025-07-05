import React from "react";
import girl2 from "../assets/images/girl2.jpeg";
import useVeryfy from "../utils/Verfy";
import { ShieldCheck, Zap, Clock, Smile } from "lucide-react";

function About() {
  useVeryfy();

  return (
    <>
      {/* Hero Header */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-100 to-green-100">
        <h3 className="text-4xl font-bold text-blue-800">About Us</h3>
        <p className="mt-2 text-gray-700 tracking-wide italic">
          Empowering your financial journey — one transaction at a time.
        </p>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 p-8">
        <img
          src={girl2}
          alt="Banking Automation"
          className="w-full md:w-[450px] rounded-2xl shadow-md"
        />
        <div className="max-w-2xl text-justify text-gray-800 space-y-4">
          <p className="leading-relaxed tracking-wide">
            Our <strong>Banking Automation System</strong> is crafted to modernize
            and simplify financial operations for both users and institutions. Traditional banking methods are often time-consuming, error-prone, and outdated — but we change that narrative.
          </p>
          <p className="leading-relaxed">
            From account creation to secure transactions, our system automates key
            tasks while ensuring reliability and trust. With built-in <strong>end-to-end encryption</strong>,
            multi-layered authentication, and real-time processing — we provide a seamless experience that’s both fast and secure.
          </p>
          <p className="leading-relaxed">
            Whether you're a customer tracking your expenses or a bank streamlining operations,
            our intuitive dashboard and powerful backend tools make everything effortless.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-gray-100 py-10 px-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Why Choose UBank Automation?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Feature icon={<ShieldCheck className="text-green-600" />} title="Bank-Grade Security" text="All data is encrypted and transactions are authenticated at every level." />
          <Feature icon={<Zap className="text-yellow-500" />} title="Lightning Fast" text="Say goodbye to delays. Enjoy real-time services that respond instantly." />
          <Feature icon={<Clock className="text-blue-500" />} title="24/7 Availability" text="Access your banking needs any time, from anywhere — no queues!" />
          <Feature icon={<Smile className="text-pink-500" />} title="User-Friendly Design" text="Simple, clean, and intuitive interface made for everyone." />
        </div>
      </div>

      {/* CTA Line */}
      <div className="text-center py-10 bg-green-700 text-white">
        <h1 className="text-xl md:text-2xl font-semibold">UBank is not just a bank, it's your digital finance partner 🚀</h1>
      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center bg-black text-white py-4 px-6">
        <h1 className="text-sm md:text-base">© 2025 UBank. All rights reserved.</h1>
        <div className="flex gap-4 text-sm mt-2 md:mt-0">
          <h2 className="cursor-pointer hover:underline">Privacy Policy</h2>
          <h2 className="cursor-pointer hover:underline">Terms & Services</h2>
          <h2 className="cursor-pointer hover:underline">Contact Us</h2>
        </div>
      </footer>
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center space-y-3">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default About;
