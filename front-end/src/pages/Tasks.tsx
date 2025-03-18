import { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import ContentLayout from "../layout/ContentLayout";
import SelectInput from "../components/form/SelectInput";
import FormFilter from "../components/form/FormFilter";
import { useAuth } from "../hooks/useAuth";
import useBaseService from "../hooks/useBaseService"; 
import { useLoader } from "../hooks/useLoader"; 
import Title from "../layout/Title";  
import "../assets/styles/task.css";
import { entities } from "../constants/entities";
import FlatList from "../components/flatlist/FlatList";

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "completa", label: "Completa" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]); 
  const [filterStatus, setFilterStatus] = useState("all");

  const { user } = useAuth();  
  const { get } = useBaseService();  
  const { showLoader, hideLoader } = useLoader();  

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) return;  

      showLoader(); 
      try {
        const response = await get(entities.users.tasks.get(user.id));
        console.log(response)
        if (response && response.result) {
          setTasks(response.result);  
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      } finally {
        hideLoader();  
      }
    };

    fetchTasks();
  }, [user?.id]);  

  // Funções para editar e excluir tarefas
  const handleEdit = (id: string) => {
    console.log("Editar tarefa:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Excluir tarefa:", id);
  };

  return (
    <ContentLayout title="Minhas Tarefas">
      <FormFilter>
        <SelectInput
          options={statusOptions}
          defaultValue={statusOptions[0]}
          onChange={setFilterStatus}
          label="Filtrar por status:"
          className="flex-grow-1"
        />
        <button className="btn btn-primary ms-2 btn-default btn-filter-task">
          <FaSearch />
        </button>
      </FormFilter>

      <Title
        title="Minhas Tarefas"
        linkIcon={<FaPlus />}
        linkText="Adicionar Tarefa"
        linkHref="/add-task"
      />

      <FlatList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </ContentLayout>
  );
};

export default Tasks;
