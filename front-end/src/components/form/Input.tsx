import React from "react";

interface InputProps {
  type: "email" | "password" | "text" | "textarea";  
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  error?: string;
  Icon?: React.ElementType;
  rows?: number; 
  className?: string;
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
  rows = 0,
  className = "",
}) => {
  return (
    <div className={`mb-3 col-12 ${className}`}> 
      <label className="form-label fw-semibold form-label-custom">{label}</label>
      <div className="position-relative">
        {Icon && (
          <Icon className="position-absolute top-50 start-0 translate-middle-y ms-3 icon-custom" />
        )}
        {type === "textarea" ? (
          <textarea
            className={`form-control ps-5 ${error ? "border border-danger" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows} 
          />
        ) : (
          <input
            type={type}
            className={`form-control ps-5 ${error ? "border border-danger" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
          />
        )}
      </div>
      {error && <p className="text-danger mt-1">{error}</p>}
    </div>
  );
};

export default Input;
