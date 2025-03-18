import FlatItem from "./FlatItem"; 

interface FlatListProps {
  tasks: {
    id: string;
    title: string;
    description: string;
    status: "pendente" | "completa";
  }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const FlatList = ({ tasks, onEdit, onDelete }: FlatListProps) => {
  return (
    <div className="list-group">
      {tasks.length === 0 ? (
        <div className="list-group-item text-center">
          Nenhuma tarefa encontrada.
        </div>
      ) : (
        tasks.map((task) => (
          <FlatItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default FlatList;
