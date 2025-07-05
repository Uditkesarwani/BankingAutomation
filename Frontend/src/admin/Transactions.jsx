import { host } from "../host";
import Sidebar from "./Sidebar";
import { useEffect, useState, useRef } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const printRef = useRef(); // Reference for printable section

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${host}/api/admin/all-transactions`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setTransactions(data.transactions);
        } else {
          console.log("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Transactions</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #38a169; color: white; }
            tr:nth-child(even) { background-color: #f7fafc; }
          </style>
        </head>
        <body>
          <h2 style="color: #38a169; text-align: center;">All Transactions</h2>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar
        onLogout={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      />
      <div className="flex-1 p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-3xl font-bold text-green-700 text-center w-full">
              All Transactions (Admin View)
            </h1>
          </div>

          {/* Print Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition"
            >
              🖨️ Print Transactions
            </button>
          </div>

          {/* Table Section to Print */}
          <div ref={printRef}>
            {transactions.length === 0 ? (
              <p className="text-center text-gray-500">No transactions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl border border-gray-200 text-sm sm:text-base">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="py-2 px-2 sm:px-4 text-left">From</th>
                      <th className="py-2 px-2 sm:px-4 text-left">To</th>
                      <th className="py-2 px-2 sm:px-4 text-left hidden sm:table-cell">Email</th>
                      <th className="py-2 px-2 sm:px-4 text-left">Amount</th>
                      <th className="py-2 px-2 sm:px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn, i) => (
                      <tr key={i} className="border-b hover:bg-green-50 transition">
                        <td className="py-2 px-2 sm:px-4 text-gray-800">
                          {txn.SenderName}
                        </td>
                        <td className="py-2 px-2 sm:px-4 text-gray-800">
                          {txn.CustomerName}
                        </td>
                        <td className="py-2 px-2 sm:px-4 text-gray-800 hidden sm:table-cell break-all">
                          {txn.Email}
                        </td>
                        <td className="py-2 px-2 sm:px-4 font-semibold text-green-700">
                          ₹{txn.Amount}
                        </td>
                        <td className="py-2 px-2 sm:px-4 text-gray-600">
                          {new Date(txn.date).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
