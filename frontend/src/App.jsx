import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";
import { useStore } from "./store/useStore";

function PrivateRoute({ children }) {
  const { token } = useStore();
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/task/:id" element={
          <PrivateRoute>
            <TaskDetail />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}