import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import createField from '../../utils/createField';

export const userFields = [
  {
    fields: [
      createField({
        id: 'name',
        label: 'Nome',
        type: 'text',
        placeholder: 'Digite seu nome',
        icon: FaUser,
        className: 'col-md-6 px-1', 
      }),
      createField({
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Digite seu email',
        icon: FaEnvelope,
        className: 'col-md-6 px-1',
      }),
      createField({
        id: 'password',
        label: 'Senha',
        type: 'password',
        placeholder: 'Digite sua senha',
        icon: FaLock,
        className: 'col-md-6 px-1', 
      }),
      createField({
        id: 'password_confirmation',
        label: 'Confirmar Senha',
        type: 'password',
        placeholder: 'Confirme sua senha',
        icon: FaCheckCircle,
        className: 'col-md-6 px-1',
      }),
    ],
  },
];
