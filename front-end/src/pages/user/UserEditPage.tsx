import React, { useEffect } from "react";
import useBaseService from "../../hooks/useBaseService";
import useForm from "../../hooks/useForm";
import { userFields } from "../../constants/forms/userFields";  
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import Form from "../../components/form/Form";
import { entities } from "../../constants/entities";
import { useAuth } from "../../hooks/useAuth";
import ContentLayout from "../../layout/ContentLayout";
import { useLoader } from "../../hooks/useLoader";

type UserField = {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "textarea"; 
  placeholder: string;
  icon?: React.ComponentType<any>;
  className?: string; 
};

const EditUser = () => {
  const { put, get, formErrors, setFormErrors } = useBaseService();
  const { formData, handleChange, setFormData } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const { user } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;

      try {
        showLoader();
        const response = await get(entities.users.getByColumn(user.id));
        if (response && response.result) {
          setFormData(response.result);
        }
      } catch (err) {
        console.error("Erro ao carregar os dados do usuário:", err);
      } finally {
        hideLoader();
      }
    };

    fetchUser();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    try {
      showLoader();
      await put(entities.users.update(user.id), formData);
    } catch (err) {
      console.error(err);
      setFormErrors({ general: "Erro ao editar usuário. Tente novamente." });
    } finally {
      hideLoader();
    }
  };

  return (
    <ContentLayout title="Editar Perfil" showBackButton={true}>
      <Form onSubmit={handleSubmit}>
        {userFields[0].fields.map((field: UserField, index: number) => (
          <Input
            key={index}
            type={field.type}
            label={field.label}
            value={formData[field.id]}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            error={formErrors[field.id]}
            Icon={field.icon}
            className={field.className} 
          />
        ))}
        {formErrors.general && <p className="text-danger">{formErrors.general}</p>}
        <Button text="Salvar Alterações" className="btn-custom"/>
        </Form>
    </ContentLayout>
  );
};

export default EditUser;
