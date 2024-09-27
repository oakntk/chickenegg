import React from "react";
import { Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import UserDashboard from "./components/User/Dashboard/UserDashboard";
import { AuthProvider } from "./context/authProvider";
import AuthGuard from "./guard/authGuard";
import Router from "./router";

const App = () => {
  // const getRole = () => {
  //   const token = localStorage.getItem("accessToken");
  //   console.log("Token:", token);
  //   if (!token) return null;

  //   try {
  //     const decoded = JSON.parse(atob(token.split(".")[1]));
  //     console.log("Decoded JWT:", decoded);
  //     const { role_id } = decoded;
  //     return role_id;
  //   } catch (error) {
  //     console.error("Error decoding token", error);
  //     return null;
  //   }
  // };

  // const roleId = getRole();
  // console.log(roleId, "role_id_app");

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
    //
    //   <Router>
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route
    //         path="/admin/dashboard"
    //         element={
    //           roleId === 1 ? <AdminDashboard /> : <Navigate to="/login" />
    //         }
    //       />
    //       <Route
    //         path="/user/dashboard"
    //         element={
    //           // roleId === 2 || roleId === 3 ? (
    //           <AuthGuard>
    //             <UserDashboard />
    //           </AuthGuard>
    //           // ) : (
    //           //   <Navigate to="/login" />
    //           // )
    //         }
    //       />
    //       {/* Default redirect based on role */}
    //       <Route
    //         path="*"
    //         element={
    //           roleId === 1 ? (
    //             <Navigate to="/admin/dashboard" />
    //           ) : roleId === 2 || roleId === 3 ? (
    //             <Navigate to="/user/dashboard" />
    //           ) : (
    //             <Navigate to="/login" /> // Redirect to login if no role found
    //           )
    //         }
    //       />
    //     </Routes>
    //   </Router>
    // </AuthProvider>
  );
};

export default App;
