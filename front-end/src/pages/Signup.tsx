import useBaseService from '../hooks/useBaseService';
import { signupFields } from '../constants/forms/signupFields';
import CenterColumn from '../components/card/CenterColumn';
import CardContainer from '../components/card/CardContainer';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import LoginImg from "../assets/imgs/login/login.png";
import { entities } from '../constants/entities';
import useForm from '../hooks/useForm';

const Signup = () => {
  const { post, formErrors, setFormErrors } = useBaseService();

  const { formData, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await post(entities.users.create, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      });

      if (response) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setFormErrors({ general: 'Erro ao fazer cadastro. Tente novamente.' });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100 bg-light">
      <div className="row w-100 shadow-lg p-4 rounded-3 card-container">
        <CenterColumn>
          <CardContainer className="card-login d-flex flex-column justify-content-center align-items-center">
            <Form onSubmit={handleSubmit}>
              {signupFields[0].fields.map((field, index) => (
                <Input
                  key={index}
                  type={field.type}
                  label={field.label}
                  value={formData[field.id]} 
                  onChange={(e) => handleChange(field.id, e.target.value)} 
                  placeholder={field.placeholder}
                  error={formErrors[field.id]}
                  Icon={field.icon}
                />
              ))}
              {formErrors.general && <p className="text-danger">{formErrors.general}</p>}
              <Button text="Cadastrar" className="btn-custom" />
            </Form>
            <p className="text-center mt-3">
              <a href="/login" className="text-decoration-none fw-semibold forgot-password-link">
                Já possui uma conta?
              </a>
            </p>
          </CardContainer>
        </CenterColumn>
        <CenterColumn>
          <div className="card border-0 card-img-container d-none d-md-flex">
            <img
              src={LoginImg}
              alt="Cadastro"
              className="card-img-top"
              style={{ borderRadius: "12px", objectFit: "cover", height: "100%" }}
            />
          </div>
        </CenterColumn>
      </div>
    </div>
  );
};

export default Signup;
