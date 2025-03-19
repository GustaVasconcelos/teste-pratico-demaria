import Select, { SingleValue } from "react-select";
import "../../assets/styles/selectInput.css";

type OptionType = {
  value: string;
  label: string;
};

type SelectInputProps = {
  options: OptionType[];
  value: string; 
  onChange: (value: string) => void;
  label?: string;
  className?: string; 
};

const SelectInput = ({ options, value, onChange, label, className }: SelectInputProps) => {
  return (
    <div className={className}>  
      {label && <label className="form-label select-label">{label}</label>}
      <Select
        options={options}
        value={options.find(option => option.value === value)} 
        onChange={(selectedOption: SingleValue<OptionType>) =>
          selectedOption && onChange(selectedOption.value) 
        }
        noOptionsMessage={() => "Nenhuma opção encontrada"}
      />
    </div>
  );
};

export default SelectInput;
