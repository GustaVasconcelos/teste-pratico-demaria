import { FaRegFileAlt, FaEdit, FaTrash, FaCheckCircle, FaUndo } from "react-icons/fa"; 
import "../../assets/styles/flatlist.css"

interface FlatItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: "pendente" | "concluída";
    deleted_at?: string | null; 
  };
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void; 
  onMarkAsCompleted: (id: string) => void;
  onRestore: (id: string) => void; 
}

const FlatItem = ({ task, onEdit, onDelete, onMarkAsCompleted, onRestore }: FlatItemProps) => {
  return (
    <div className="p-3 mb-2 border rounded shadow-sm">
      <div className="container-title-flat-item d-flex justify-content-between align-items-center">
        <h5 className="flat-list-item-title">
          <FaRegFileAlt />
          {task.title}
        </h5>
        <span className={`p-2 badge bg-${task.status === "concluída" ? "success" : "warning"}`}>
          Status: {task.status === "concluída" ? "Concluída" : "Pendente"}
        </span>
      </div>
      <p className="flat-item-description mt-2">
        <strong>Descrição: </strong>
          {task.description}
        </p>
      <div className="container-actions d-flex al gap-2">
        {task.deleted_at === null && (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onEdit(task.id)}
              disabled={task.status === "concluída"}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(task.id)}
            >
              <FaTrash /> Excluir
            </button>
          </>
        )}
        {task.status === "pendente" && !task.deleted_at && (
          <button className="btn btn-success btn-sm" onClick={() => onMarkAsCompleted(task.id)}>
            <FaCheckCircle /> Concluir
          </button>
        )}

        {task.deleted_at && (
          <button className="btn btn-info btn-sm" onClick={() => onRestore(task.id)}>
            <FaUndo /> Restaurar
          </button>
        )}
      </div>
    </div>
  );
};

export default FlatItem;
