// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   return user ? children : <Navigate to="/auth" replace />;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
const ProtectedUserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "user") return <Navigate to="/auth" />;
  return children;
};


export default ProtectedUserRoute;

