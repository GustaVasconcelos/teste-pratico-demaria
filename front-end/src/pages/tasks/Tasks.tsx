import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa"; 
import ContentLayout from "../../layout/ContentLayout";
import SelectInput from "../../components/form/SelectInput";
import FormFilter from "../../components/form/FormFilter";
import { useAuth } from "../../hooks/useAuth";
import useBaseService from "../../hooks/useBaseService";
import { useLoader } from "../../hooks/useLoader";
import Title from "../../layout/Title";
import "../../assets/styles/task.css";
import { entities } from "../../constants/entities";
import FlatList from "../../components/flatlist/FlatList";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/modals/ConfirmationModal";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pendente" | "concluída";
  deleted_at?: string | null; 
}

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "concluída", label: "Concluída" },
];

const deletedAtOptions = [
  { value: "not_null", label: "Deletadas" },
  { value: "null", label: "Não Deletadas" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState("pendente");
  const [filterDeletedAt, setFilterDeletedAt] = useState("null");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false); 
  const [taskToMarkCompleted, setTaskToMarkCompleted] = useState<Task | null>(null); 
  const [showRestoreModal, setShowRestoreModal] = useState(false); 
  const [taskToRestore, setTaskToRestore] = useState<Task | null>(null); 
  const { user } = useAuth();
  const { get, del, post, put } = useBaseService(); 
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [user?.id, filterStatus, filterDeletedAt]);

  const fetchTasks = async () => {
    if (!user?.id) return;

    showLoader();
    try {
      const filters = {
        status: filterStatus,
        deleted_at: filterDeletedAt,
      };

      const response = await get(entities.users.tasks.get(user.id), filters);
      if (response && response.result) {
        setTasks(response.result);
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      hideLoader();
    }
  };

  const handleEdit = (task: Task) => {
    navigate(`/tarefas/editar/${task.id}`);
  };

  const handleDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };

  const handleMarkAsCompleted = (task: Task) => {
    setTaskToMarkCompleted(task);
    setShowCompletionModal(true); 
  };

  const handleRestore = (task: Task) => {
    setTaskToRestore(task);
    setShowRestoreModal(true); 
  };

  const confirmMarkAsCompleted = async () => {
    if (!user?.id || !taskToMarkCompleted) return;

    try {
      await put(entities.users.tasks.update(user.id, taskToMarkCompleted.id), { status: "concluída" });
      setShowCompletionModal(false); 
      fetchTasks();
    } catch (error) {
      console.error("Erro ao marcar tarefa como concluída:", error);
    }
  };

  const confirmDelete = async () => {
    if (!user?.id || !taskToDelete) return;

    try {
      await del(entities.users.tasks.delete(user.id, taskToDelete.id));
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const confirmRestore = async () => {
    if (!user?.id || !taskToRestore) return;

    try {
      await post(entities.users.tasks.update(user.id, taskToRestore.id) + '/restore', {});
      setShowRestoreModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao restaurar a tarefa:", error);
    }
  };

  return (
    <ContentLayout title="Minhas Tarefas" showBackButton={true}>
      <FormFilter>
        <SelectInput
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
          label="Filtrar por status:"
          className="px-1 col-md-6 col-12"
        />

        <SelectInput
          options={deletedAtOptions}
          value={filterDeletedAt}
          onChange={setFilterDeletedAt}
          label="Filtrar por deletadas:"
          className="px-1 col-md-6 col-12"
        />
      </FormFilter>

      <Title
        title="Minhas Tarefas"
        linkIcon={<FaPlus />}
        linkText="Adicionar Tarefa"
        linkHref="/tarefas/criar"
      />

      <FlatList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMarkAsCompleted={handleMarkAsCompleted}
        onRestore={handleRestore}
      />

      <ConfirmationModal
        open={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onConfirm={confirmMarkAsCompleted}
        itemName={taskToMarkCompleted?.title}
        text="Tem certeza que deseja marcar a tarefa como concluída?"
      />

      <ConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        itemName={taskToDelete?.title}
        text="Tem certeza que deseja excluir a tarefa?"
      />

      <ConfirmationModal
        open={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        onConfirm={confirmRestore}
        itemName={taskToRestore?.title}
        text="Tem certeza que deseja restaurar a tarefa?"
      />
    </ContentLayout>
  );
};

export default Tasks;
