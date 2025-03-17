import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`row w-100 shadow-lg p-4 rounded-3 card-container ${className}`}>
      {children}
    </div>
  );
};

export default Card;
