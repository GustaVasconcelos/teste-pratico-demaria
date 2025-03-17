import { IconType } from 'react-icons';

interface FieldProps {
  id: string;
  label: string;
  type: "email" | "password" | "text";  
  placeholder: string;
  icon: IconType;
  fullWidth?: boolean;
  isMulti?: boolean;
}

const createField = ({
  id,
  label,
  type,
  placeholder,
  icon,
  fullWidth = false,
  isMulti = false,
}: FieldProps) => {
  return {
    id,
    label,
    type,
    placeholder,
    icon,
    fullWidth,
    isMulti,
  };
};

export default createField;
