import React, { useState } from "react";
import ContentLayout from "../layout/ContentLayout";

const Tasks = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  return (
    <ContentLayout title="Minhas Tarefas">
      <div className="task-input">
        <input
          type="text"
          className="form-control"
          placeholder="Digite sua tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Adicionar
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item">
            {task}
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
};

export default Tasks;
