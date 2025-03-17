import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "../assets/styles/sidebar.css";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext) || {}; 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link d-flex align-items-center">
            <FaHome className="icon me-2" />
            {isOpen && "Home"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/tasks" className="nav-link d-flex align-items-center">
            <FaTasks className="icon me-2" />
            {isOpen && "Tarefas"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link d-flex align-items-center">
            <FaUser className="icon me-2" />
            {isOpen && "Perfil"}
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <><FaTimes /> Fechar</> : <FaBars />}
        </button>

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt />
          {isOpen && "Sair"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
