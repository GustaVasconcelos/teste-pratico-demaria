import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import "../assets/styles/contentLayout.css";

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ title, children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
        <h2 className="layout-title">{title}</h2>
        <div className="layout-body">{children}</div>
      </div>
    </div>
  );
};

export default ContentLayout;
