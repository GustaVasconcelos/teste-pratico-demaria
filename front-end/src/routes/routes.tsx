import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Tasks from "../pages/Tasks";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Signup />} />

      <Route path="/tarefas" element={<PrivateRoute> <Tasks /> </PrivateRoute>} />

      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
