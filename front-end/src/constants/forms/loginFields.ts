import { FaEnvelope, FaLock } from 'react-icons/fa';
import createField from '../../utils/createField';

export const loginFields = [
  {
    fields: [
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
    ],
  },
];
