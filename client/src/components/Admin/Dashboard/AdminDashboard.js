// src/components/Admin/Dashboard/AdminDashboard.js

import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all data from local storage
    localStorage.clear();

    // Redirect to login page
    navigate("/login");

    // Optionally reload the page (comment this line if you prefer not to refresh)
    window.location.reload();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
      {/* Additional admin dashboard content */}
    </div>
  );
};

export default AdminDashboard;
