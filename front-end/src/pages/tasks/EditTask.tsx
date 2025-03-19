import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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

const EditTask = () => {
  const { put, get, formErrors, setFormErrors } = useBaseService();
  const { formData, handleChange, setFormData} = useForm({
    title: "",
    description: "",
  });
  const { user } = useAuth();  
  const { taskId } = useParams();  
  const { showLoader, hideLoader } = useLoader();  

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId || !user?.id) return;

      try {
        showLoader();
        const response = await get(entities.users.tasks.getByColumn(user.id, taskId));
        if (response && response.result) {
          setFormData(response.result)
        }
      } catch (err) {
        console.error("Erro ao carregar a tarefa:", err);
      } finally {
        hideLoader();
      }
    };

    fetchTask();
  }, [taskId, user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id || !taskId) return;

    try {
      showLoader();
      await put(entities.users.tasks.update(user.id, taskId), formData);
    } catch (err) {
      console.error(err);
      setFormErrors({ general: "Erro ao editar tarefa. Tente novamente." });
    } finally {
      hideLoader();
    }
  };

  return (
    <ContentLayout title="Editar Tarefa" showBackButton={true}>
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
        <Button text="Salvar Alterações" className="btn-custom" />
      </Form>
    </ContentLayout>
  );
};

export default EditTask;
