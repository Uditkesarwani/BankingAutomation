
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useVeryfy from "../utils/Verfy";

function Detail() {
  useVeryfy()
  const navigate = useNavigate();
  const location = useLocation();

  const Fcus = location.state?.cus1 || "Guest"; // Sender Name
  const Tcus = location.state?.cus2 || "Guest"; // Receiver Name
  const em = location.state?.email || "xyz@gmail.com"; // Receiver Email
  const Amt = parseFloat(location.state?.amt) || 100; // Amount (float conversion for summation)

  useEffect(() => {
    let storedArr = localStorage.getItem("transactions");
    let arr = storedArr ? JSON.parse(storedArr) : [];

    // **Invalid Transaction Check (Guest or Empty Values)**
    if (
      !Fcus || !Tcus || !em || !Amt ||
      Fcus.toLowerCase() === "guest" ||
      Tcus.toLowerCase() === "guest"
    ) {
      console.log("Invalid transaction detected, not storing in localStorage.");
      return;
    }

    let obj = { a: Fcus, b: Tcus, c: em, d: Amt };

    // ✅ **Check if `cus2` & `email` are same → Add amount instead of new entry**
    let existingTransaction = arr.find((item) => item.b === obj.b && item.c === obj.c);

    if (existingTransaction) {
      // 💰 Amount Update Logic
      existingTransaction.d = parseFloat(existingTransaction.d) + Amt;
      console.log(`Updated Amount for ${Tcus} (${em}):`, existingTransaction.d);
    } else {
      // 🔄 New Entry if `cus2` & `email` are different
      arr.push(obj);
    }

    localStorage.setItem("transactions", JSON.stringify(arr));
    console.log("Updated Transactions:", arr);
  }, [Fcus, Tcus, em, Amt]);

  const backTohome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Transaction Detail</h1>
          <div className="space-y-4 text-lg font-medium text-gray-700">
            <p className="flex justify-between border-b pb-2">
              <span className="font-bold text-gray-900">From:</span> {Fcus}
            </p>
            <p className="flex justify-between border-b pb-2">
              <span className="font-bold text-gray-900">To:</span> {Tcus}
            </p>
            <p className="flex justify-between border-b pb-2">
              <span className="font-bold text-gray-900">Email:</span> {em}
            </p>
            <p className="flex justify-between border-b pb-2">
              <span className="font-bold text-gray-900">Amount:</span> {Amt}
            </p>
          </div>
          <button
            className="bg-black text-white font-medium py-3 px-6 mt-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
            onClick={backTohome}
          >
            Go Back To Home
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-black text-white py-4 px-6">
        <h1 className="text-sm md:text-base">
          © 2025 UBank. All rights reserved.
        </h1>
        <div className="flex gap-4 text-sm">
          <h2 className="cursor-pointer hover:underline">Privacy Policy</h2>
          <h2 className="cursor-pointer hover:underline">Terms & Services</h2>
          <h2 className="cursor-pointer hover:underline">Contact Us</h2>
        </div>
      </div>
    </>
  );
}

export default Detail;

