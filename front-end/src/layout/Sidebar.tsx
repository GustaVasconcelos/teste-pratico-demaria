import { FaSignOutAlt, FaTasks, FaUser, FaDog  } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import "../assets/styles/sidebar.css";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/tarefas" className="nav-link d-flex align-items-center">
            <FaTasks className="icon me-2" />
            {isOpen && "Tarefas"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/perfil" className="nav-link d-flex align-items-center">
            <FaUser className="icon me-2" />
            {isOpen && "Perfil"}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/cachorro" className="nav-link d-flex align-items-center">
            <FaDog  className="icon me-2" /> 
            {isOpen && "Cachorro"}
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          {isOpen && "Sair"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
