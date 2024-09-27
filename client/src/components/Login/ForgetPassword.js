// src/components/Login/ForgetPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, TextField, Button, Typography, Link } from "@mui/material";
import ChickenLogin from "../../image/chickenlogin.png"; // Use the same or different image

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forget-password",
        { email }
      );

      console.log(response.data);
      // Redirect or show a success message
      navigate("/login");
    } catch (error) {
      console.error("Request failed", error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={7}
        sx={{
          backgroundImage: `url(${ChickenLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      />
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: (theme) => theme.palette.secondary.main,
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          color="text.primary"
          fontWeight="Bold"
        >
          Forgot Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Enter your email address to receive a password reset link.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Grid container spacing={2} marginTop={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Send Reset Link
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Remember your password?{" "}
            <Link href="/login" underline="hover" color="text.primary">
              Back to Login
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
