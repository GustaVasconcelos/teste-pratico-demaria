import React from "react";

interface InputProps {
  type: "email" | "password" | "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  error?: string;
  Icon?: React.ElementType; 
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  required,
  error,
  Icon, 
}) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold form-label-custom">{label}</label>
      <div className="position-relative">
        {Icon && (
          <Icon className="position-absolute top-50 start-0 translate-middle-y ms-3 icon-custom" />
        )}
        <input
          type={type}
          className={`form-control ps-5 ${error ? "border border-danger" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
      {error && <p className="text-danger mt-1">{error}</p>}
    </div>
  );
};

export default Input;
