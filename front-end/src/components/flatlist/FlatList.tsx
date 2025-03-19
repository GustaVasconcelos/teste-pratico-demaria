import FlatItem from "./FlatItem"; 

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pendente" | "concluída";
}

interface FlatListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onMarkAsCompleted: (task: Task) => void;  
  onRestore: (task: Task) => void; 
}

const FlatList = ({ tasks, onEdit, onDelete, onMarkAsCompleted, onRestore }: FlatListProps) => {
  return (
    <div className="list-group">
      {tasks.length === 0 ? (
        <div className="list-group-item text-center">
          Nenhuma tarefa encontrada.
        </div>
      ) : (
        tasks.map((task) => (
          <FlatItem key={task.id} task={task} onEdit={() => onEdit(task)} onDelete={() => onDelete(task)} onMarkAsCompleted={() => onMarkAsCompleted(task)} onRestore={() => onRestore(task)}/>
        ))
      )}
    </div>
  );
};

export default FlatList;
