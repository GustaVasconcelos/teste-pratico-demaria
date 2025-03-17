import React from "react";

interface ButtonProps {
  text: string;
  type?: "submit" | "button" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, type = "submit", className }) => {
  return (
    <button type={type} className={`btn w-100 fw-bold ${className}`}>
      {text}
    </button>
  );
};

export default Button;
