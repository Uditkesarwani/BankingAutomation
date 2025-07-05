import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../host";

function useVeryfy() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/verify`, {
          credentials: "include",
        });

        const data = await response.json();
        console.log(data.ok);
        if (!data.success) {
          navigate("/auth");
        }
      } catch (err) {
        console.log("Error", err);
        navigate("/auth");
      }
    };

    fetchData();
  }, [navigate]);
}

export default useVeryfy;
