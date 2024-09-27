import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import ChickenLogin from "../../image/chickenlogin.png";
import { useAuthContext } from "../../context/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const handleLogin = async () => {
    setLoading(true); // Start loading state
    setError(""); // Reset error state

    await login(email, password);
    // try {
    //   const response = await fetch("http://localhost:3333/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();
    //   console.log("Login response:", data);

    //   if (data.status === "success") {
    //     localStorage.setItem("accessToken", data.token);
    //     localStorage.setItem("role_id", data.role_id);

    //     // Redirect based on role
    //     if (data.role_id === 1) {
    //       navigate("/admin/dashboard");
    //     } else if (data.role_id === 2 || data.role_id === 3) {
    //       navigate("/user/dashboard");
    //     }
    //   } else {
    //     console.error("Login error:", data.message);
    //     alert("Login failed: " + data.message);
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   setError("An error occurred during login.");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
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
          fontWeight="bold"
        >
          Welcome
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Login to your account to continue.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ alignSelf: "flex-end" }}
          >
            <Link
              component={RouterLink}
              to="/forget-password"
              underline="hover"
              color="text.primary"
            >
              Forgot Password?
            </Link>
          </Typography>
          <Grid container spacing={2} marginTop={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign in"}
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              color="text.primary"
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
