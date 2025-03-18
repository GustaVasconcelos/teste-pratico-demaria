import { FaRegFileAlt , FaEdit, FaTrash } from "react-icons/fa"; 
import "../../assets/styles/flatlist.css"

interface FlatItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: "pendente" | "completa";
  };
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void; 
}

const FlatItem = ({ task, onEdit, onDelete }: FlatItemProps) => {
  return (
    <div className="p-3 mb-2 border rounded shadow-sm">
        <div className="container-title-flat-item d-flex justify-content-between align-items-center">
            <h5 className="flat-list-item-title">
                <FaRegFileAlt/>
                {task.title}
            </h5>
            <span className={`p-2 badge bg-${task.status === "completa" ? "success" : "warning"}`}>
                Status: {task.status === "completa" ? "Completa" : "Pendente"}
            </span>
        </div>
        <p className="flat-item-description mt-2"><strong>Descrição:</strong></p>
        <p> {task.description}</p>
        <div className="container-actions d-flex al gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(task.id)}>
                <FaEdit /> Editar
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(task.id)}>
                <FaTrash /> Excluir
                </button>
            </div>
      </div>
  );
};

export default FlatItem;
