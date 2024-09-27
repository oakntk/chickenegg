import { Routes, Route, useRoutes } from "react-router-dom";
import Login from "./components/Login/Login";
import AuthGuard from "./guard/authGuard";

export default function Router() {
  return useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/user/dashboard",
      element: (
        <AuthGuard>
          <>test</>
        </AuthGuard>
      ),
    },
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/user/dashboard" element={<>test</>} />
    //   </Routes>
    // </Router>
  ]);
}
