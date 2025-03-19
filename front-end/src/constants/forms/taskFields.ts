import { FaClipboard, FaTasks } from 'react-icons/fa';
import createField from '../../utils/createField';

export const taskFields = [
  {
    fields: [
      createField({
        id: 'title',
        label: 'Título',
        type: 'text',  
        placeholder: 'Digite o título da tarefa',
        icon: FaClipboard,
      }),
      createField({
        id: 'description',
        label: 'Descrição',
        type: 'textarea',  
        placeholder: 'Digite a descrição da tarefa',
        icon: FaTasks,
      }),
    ],
  },
];
