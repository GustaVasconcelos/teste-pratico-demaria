import React from "react";
import useBaseService from "../../hooks/useBaseService"; 
import useForm from "../../hooks/useForm"; 
import { taskFields } from "../../constants/forms/taskFields"; 
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import Form from "../../components/form/Form";
import { entities } from "../../constants/entities";
import { useAuth } from "../../hooks/useAuth";
import ContentLayout from "../../layout/ContentLayout";
import { useLoader } from "../../hooks/useLoader";

type TaskField = {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "textarea"; 
  placeholder: string;
  icon?: React.ComponentType<any>;
};


const CreateTask = () => {
  const { post, formErrors, setFormErrors } = useBaseService();
  const { formData, handleChange, resetForm } = useForm({
    title: "",
    description: "",
  });
  const { user } = useAuth();  
  const { showLoader, hideLoader } = useLoader();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;  

    try {
      showLoader
      const success = await post(entities.users.tasks.create(user.id), formData);
      if (success) {
        resetForm()
      }
    } catch (err) {
      console.error(err);
      setFormErrors({ general: "Erro ao criar tarefa. Tente novamente." });
    } finally {
      hideLoader();
    }
  };

  return (

    <ContentLayout title="Criar Tarefa" showBackButton={true}>
      <Form onSubmit={handleSubmit}>
        {taskFields[0].fields.map((field: TaskField, index: number) => (
          <Input
            key={index}
            type={field.type as "text"} 
            label={field.label}
            value={formData[field.id]} 
            onChange={(e) => handleChange(field.id, e.target.value)} 
            placeholder={field.placeholder}
            error={formErrors[field.id]}
            Icon={field.icon}
          />
        ))}
        {formErrors.general && <p className="text-danger">{formErrors.general}</p>}
        <Button text="Criar Tarefa" className="btn-custom" />
      </Form>
    </ContentLayout>
  );
};

export default CreateTask;
