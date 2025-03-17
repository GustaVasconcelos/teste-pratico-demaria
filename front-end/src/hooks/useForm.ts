import { useState } from 'react';

interface FormData {
  [key: string]: string;
}

const useForm = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [initialFormData, setInitialFormData] = useState<FormData>(initialData);

  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  const initializeData = (fields: { id: string }[]) => {
    const initializedData = fields.reduce((acc: FormData, field) => {
      acc[field.id] = '';
      return acc;
    }, {});
    setFormData(initializedData);
    setInitialFormData(initializedData);
  };

  const formatData = (response: any, fields: { id: string }[]) => {
    const parsedData = fields.reduce((acc: FormData, field) => {
      acc[field.id] = response[field.id] || '';
      return acc;
    }, {});

    setFormData(parsedData);
  };

  return {
    formData,
    initialFormData,
    setFormData,
    handleChange,
    resetForm,
    initializeData,
    formatData,
  };
};

export default useForm;
