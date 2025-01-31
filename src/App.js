import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Route guards
import PrivateRoute from "./routes/privateRoute";
import PublicRoute from "./routes/publicRoute";

// Pages
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notfound";
// Layout
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* Add more protected routes here */}
            </Route>
          </Route>

          {/* Redirect root to dashboard or login based on auth status */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
