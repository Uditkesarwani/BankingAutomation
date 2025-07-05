
import React, { useEffect, useState } from "react";
import useVeryfy from "../utils/Verfy";
import girl2 from "../assets/images/girl2.jpeg";
import girl1 from "../assets/images/girl1.jpeg";
import purse from "../assets/images/purse.jpeg";
import credit from "../assets/images/credit.jpeg";
import income from "../assets/images/income.jpg";
import insurancer from "../assets/images/insurancer.jpg";
import speaker from "../assets/images/speaker.jpeg";
import investment from "../assets/images/financialInvestiment.avif";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  useVeryfy();
  const navigate = useNavigate();

  const createAccount = () => {
    navigate("/AccountCreate");
  };
  const arr1 = [
    "ALL CUSTOMER DETAIL",
    "TRANSACTIONS",
    "UBank",
    "AUTOMATED BANKING",
    "24/7 SUPPORT",
  ];
  
  const arr2 = [
    "We provide seamless access to all customer information securely and efficiently.",
    "View your full transaction history, sorted by time and type. Fast and accurate!",
    "UBank - Your partner in safe and smart banking for a brighter financial future.",
    "Say goodbye to paperwork. Enjoy fast and automated banking like never before.",
    "Need help anytime? Our AI-powered support is here 24/7 for your service.",
  ];
  

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % arr1.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <img src={girl1} alt="" className="w-screen h-150 object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="text-white text-center max-w-lg px-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={arr1[index]}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold"
              >
                {arr1[index]}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={arr2[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-base"
              >
                {arr2[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* About Us */}
      <section className="p-8 text-center">
        <h3 className="text-3xl font-bold mb-2">About Us</h3>
        <p className="tracking-wide font-thin">
          Empowering your financial journey, one transaction at a time
        </p>
        <div className="flex flex-wrap items-center justify-center mt-8 gap-6">
          <img src={girl2} alt="" className="w-96 rounded-lg" />
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6 w-full md:w-[80%] mx-auto text-left">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-900">
              Why Choose Our Banking Automation System?
            </h2>
            <ul className="list-disc pl-6 text-gray-800 space-y-3 text-justify">
              <li>
                <strong>Modernized Banking:</strong> Our system eliminates
                outdated manual processes and brings cutting-edge automation to
                financial operations.
              </li>
              <li>
                <strong>Secure Transactions:</strong> We use advanced
                encryption and multi-layered authentication to ensure all user
                data and transactions remain safe.
              </li>
              <li>
                <strong>Real-Time Services:</strong> Instant account management,
                transaction history tracking, and income monitoring for a
                seamless experience.
              </li>
              <li>
                <strong>Institutional Support:</strong> Powerful backend tools
                enable banks to manage operations efficiently and make
                data-driven decisions.
              </li>
              <li>
                <strong>User-Friendly Interface:</strong> A clean, intuitive UI
                empowers users to perform banking tasks with ease, even with
                minimal tech skills.
              </li>
              <li>
                <strong>Error-Free Efficiency:</strong> Automation minimizes
                human error and speeds up workflows, enhancing productivity and
                customer satisfaction.
              </li>
              <li>
                <strong>Scalable & Future-Ready:</strong> Built to adapt with
                growing needs, supporting digital transformation in financial
                institutions.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-10 px-4 bg-gradient-to-b from-green-100 to-green-300">
        <h3 className="text-4xl font-bold text-center italic">Our Services</h3>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            {
              img: purse,
              title: "Business Consulting",
              text: "We optimize banking automation, security, and cost efficiency.",
            },
            {
              img: credit,
              title: "Credit/Debit Card",
              text: "Choose from credit card options with rewards and travel benefits.",
            },
            {
              img: income,
              title: "Income Monitoring",
              text: "Track earnings & expenses for better financial decisions.",
            },
            {
              img: insurancer,
              title: "Insurance Consulting",
              text: "Expert advice on life, health, and property insurance.",
            },
            {
              img: speaker,
              title: "Financial Management",
              text: "Budgeting, saving, and retirement planning made easy.",
            },
            {
              img: investment,
              title: "Financial Investment",
              text: "Grow wealth with smart investment opportunities.",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-lg w-80 p-6 text-center"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h4 className="text-xl font-bold">{service.title}</h4>
              <p className="text-gray-600 mt-2">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              name: "Amit Sharma",
              text: "UBank has completely changed the way I manage my money. Super smooth!",
            },
            {
              name: "Priya Sinha",
              text: "I feel safe and secure using UBank. Their automation is top-notch!",
            },
            {
              name: "Rahul Mehra",
              text: "Fast, reliable, and modern. Best banking experience ever!",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="w-72 bg-gray-100 p-6 rounded-xl shadow"
            >
              <p className="italic">"{t.text}"</p>
              <p className="mt-4 font-bold">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white py-12">
        <div className="flex flex-wrap justify-evenly text-center gap-8">
          <div>
            <h1 className="text-4xl font-bold">10K+</h1>
            <p>Active Users</p>
          </div>
          <div>
            <h1 className="text-4xl font-bold">₹1 Cr+</h1>
            <p>Total Transactions</p>
          </div>
          <div>
            <h1 className="text-4xl font-bold">99.9%</h1>
            <p>Uptime</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-green-600 text-white text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Ready to get started?</h1>
        <p className="mb-6">
          Create an account and begin your secure banking journey today.
        </p>
        <button
          className="bg-white text-green-700 px-6 py-3 rounded-md font-semibold hover:bg-green-200 transition"
          onClick={createAccount}
        >
          Create Account
        </button>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              q: "Is UBank secure?",
              a: "Yes, we use end-to-end encryption and industry best practices for all transactions.",
            },
            {
              q: "Can I open multiple accounts?",
              a: "Yes, as long as they are associated with your verified email.",
            },
            {
              q: "How fast are transfers?",
              a: "Instant for internal UBank transfers. 1-2 business days for external transfers.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{faq.q}</h3>
              <p className="text-gray-600 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center bg-black text-white py-4 px-6">
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

export default Home;
