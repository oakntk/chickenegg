// src/components/User/Dashboard/UserDashboard.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material"; // Import Material-UI components

const UserDashboard = () => {
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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">User Dashboard</Typography>
      {/* Logout Button */}
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
      {/* Additional user dashboard content can be added here */}
    </div>
  );
};

export default UserDashboard;