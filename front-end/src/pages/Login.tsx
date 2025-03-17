import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import useBaseService from "../hooks/useBaseService";
import { loginFields } from "../constants/forms/loginFields";
import useForm from "../hooks/useForm";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import CenterColumn from "../components/card/CenterColumn";
import CardContainer from "../components/card/CardContainer";
import Form from "../components/form/Form";
import LoginImg from "../assets/imgs/login/login.png";
import { entities } from "../constants/entities";

type LoginField = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
  icon: React.ComponentType<any>;
};

const Login = () => {
  const { post, formErrors, setFormErrors } = useBaseService();
  const { login } = useAuth();  
  const { formData, handleChange } = useForm({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await post(entities.auth.login.create(''), formData);
      if (response && response.result) {
        const token = response.result;
        login(token); 
        console.log("Login bem-sucedido!");
        navigate("/tarefas");  
      }
    } catch (err) {
      console.error(err);
      setFormErrors({ general: "Erro ao fazer login. Tente novamente." });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100 bg-light">
      <div className="row w-100 shadow-lg p-4 rounded-3 card-container">
        <CenterColumn>
          <CardContainer className="card-login d-flex flex-column justify-content-center align-items-center">
            <Form onSubmit={handleSubmit}>
              {loginFields[0].fields.map((field: LoginField, index: number) => (
                <Input
                  key={index}
                  type={field.type as "email" | "password" | "text"}
                  label={field.label}
                  value={formData[field.id]} 
                  onChange={(e) => handleChange(field.id, e.target.value)} 
                  placeholder={field.placeholder}
                  error={formErrors[field.id]}
                  Icon={field.icon}
                />
              ))}
              {formErrors.general && <p className="text-danger">{formErrors.general}</p>}
              <Button text="Entrar" className="btn-custom" />
            </Form>
            <p className="text-center mt-3">
              <a href="/cadastro" className="text-decoration-none fw-semibold forgot-password-link">
                Não possui uma conta?
              </a>
            </p>
          </CardContainer>
        </CenterColumn>

        <CenterColumn>
          <div className="card border-0 card-img-container d-none d-md-flex">
            <img
              src={LoginImg}
              alt="Autenticação"
              className="card-img-top"
              style={{ borderRadius: "12px", objectFit: "cover", height: "100%" }}
            />
          </div>
        </CenterColumn>
      </div>
    </div>
  );
};

export default Login;
