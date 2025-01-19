import React, { useState } from "react";

import GlobalStyles from "./GlobalStyles";
import { TaskList } from "./components/TaskList";
import { PriorityType, TaskProps } from "./components/Task";
import { TaskForm } from "./components/TaskForm";

const mockTasks: TaskProps[] = [
  {
    id: 1,
    title: "Create Task Component",
    description: "The Task component is the base component.",
    priority: "High",
  },
  {
    id: 2,
    title: "Create Task List Component",
    description:
      "The Task List component displays a list of Tasks. Also, it filteres the cards based on filter criteria.",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Filter Dropdown Component",
    description: "It provides a interface for applying filteres",
    priority: "Low",
  },
];

const mockExistingTask = {
  id: 1,
  title: "Existing Task",
  description: "Existing description",
  priority: "Medium" as PriorityType,
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(mockTasks);
  const [editingTask, setEditingTask] = useState(mockExistingTask);

  const handleAddTask = (task: {
    title: string;
    description: string;
    priority: PriorityType;
  }) => {
    const newTask = {
      id: Date.now(),
      ...task,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task: {
    title: string;
    description: string;
    priority: PriorityType;
  }) => {
    if (editingTask) {
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? { ...t, ...task } : t))
      );
      setEditingTask(null);
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <h1>Task Tracker</h1>
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          existingTask={editingTask}
        />
        <TaskList tasks={tasks} />
      </div>
    </>
  );
};

export default App;
