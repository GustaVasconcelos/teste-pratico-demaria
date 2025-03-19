import { IconType } from 'react-icons';

interface FieldProps {
  id: string;
  label: string;
  type: "email" | "password" | "text" | "textarea";  
  placeholder: string;
  icon: IconType;
  fullWidth?: boolean;
  isMulti?: boolean;
  className?: string;
}

const createField = ({
  id,
  label,
  type,
  placeholder,
  icon,
  fullWidth = false,
  isMulti = false,
  className = ''
}: FieldProps) => {
  return {
    id,
    label,
    type,
    placeholder,
    icon,
    fullWidth,
    isMulti,
    className
  };
};

export default createField;
