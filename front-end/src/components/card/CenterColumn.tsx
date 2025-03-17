import React from "react";

interface CenterColumnProps {
  children: React.ReactNode;
  className?: string;
}

const CenterColumn: React.FC<CenterColumnProps> = ({ children, className }) => {
  return (
    <div className={`col-md-6 d-flex justify-content-center align-items-center ${className}`}>
      {children}
    </div>
  );
};

export default CenterColumn;
