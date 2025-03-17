import React, { ReactNode } from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit} className="w-100">{children}</form>;
};

export default Form;
