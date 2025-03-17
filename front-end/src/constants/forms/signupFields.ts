import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import createField from '../../utils/createField';

export const signupFields = [
  {
    fields: [
      createField({
        id: 'name',
        label: 'Nome',
        type: 'text',
        placeholder: 'Digite seu nome',
        icon: FaUser,
      }),
      createField({
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Digite seu email',
        icon: FaEnvelope,
      }),
      createField({
        id: 'password',
        label: 'Senha',
        type: 'password',
        placeholder: 'Digite sua senha',
        icon: FaLock,
      }),
      createField({
        id: 'confirmPassword',
        label: 'Confirmar Senha',
        type: 'password',
        placeholder: 'Confirme sua senha',
        icon: FaCheckCircle,
      }),
    ],
  },
];
