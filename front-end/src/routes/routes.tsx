import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Tasks from "../pages/tasks/Tasks";
import CreateTask from "../pages/tasks/CreateTask";  
import EditTask from "../pages/tasks/EditTask";
import UserEditPage from "../pages/user/UserEditPage";  
import DogPage from "../pages/DogPage"; 
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Signup />} />

      <Route path="/tarefas" element={<PrivateRoute> <Tasks /> </PrivateRoute>} />
      <Route path="/tarefas/criar" element={<PrivateRoute> <CreateTask /> </PrivateRoute>} />  
      <Route path="/tarefas/editar/:taskId" element={<PrivateRoute> <EditTask /> </PrivateRoute>} />
      
      <Route path="/perfil" element={<PrivateRoute> <UserEditPage /> </PrivateRoute>} /> 

      <Route path="/cachorro" element={<PrivateRoute> <DogPage /> </PrivateRoute>} />

      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
