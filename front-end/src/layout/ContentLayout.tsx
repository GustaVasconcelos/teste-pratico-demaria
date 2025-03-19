import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "./Sidebar";
import "../assets/styles/contentLayout.css";
import { FaTimes, FaBars } from "react-icons/fa"; 
import "../assets/styles/topbar.css";

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
  showBackButton?: boolean; 
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ title, children, showBackButton }) => {
  const navigate = useNavigate(); 

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const handleBack = () => {
    navigate(-1);  
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} /> 
      
      <div className="layout-content">
        <div className={`topbar d-flex justify-content-between align-items-center ${isSidebarOpen ? 'open' : 'closed'}`}>
          <button className="btn btn-default" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          {showBackButton && (
            <button
              className="btn btn-secondary btn-default"
              onClick={handleBack} 
            >
              Voltar
            </button>
          )}
        </div>
        
        <h2 className="layout-title">{title}</h2>

        <div className="layout-body">{children}</div>
      </div>
    </div>
  );
};

export default ContentLayout;
