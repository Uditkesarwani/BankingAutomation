import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../host";

export default function DeleteBankAccount() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setLoading(true);

    try {
      const res = await fetch(`${host}/api/account/delete`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Account deleted successfully.");
        navigate("/createaccount");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Deletion failed:", err);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete Account"}
    </button>
  );
}
