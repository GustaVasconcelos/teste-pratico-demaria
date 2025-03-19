import React from "react";

type FormFilterProps = {
  children: React.ReactNode; 
};

const FormFilter = ({ children }: FormFilterProps) => {
  return (
    <form className="mb-3">
      <div className="row d-flex align-items-end">
        {children} 
      </div>
    </form>
  );
};

export default FormFilter;
