import React from "react";

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({ children, className }) => {
  return <div className={`card border-0 ${className}`}>{children}</div>;
};

export default CardContainer;
