import React, { useState } from "react";

import { TaskListContainer, TaskListP } from "./TaskList.style";
import { useTaskContext } from "../../contexts/TaskContext";
import { PriorityType, Task } from "../Task";
import { TaskPopup } from "../TaskPopup";

const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<PriorityType>("Low");

  const handleEdit = (
    id: string,
    title: string,
    description: string,
    priority: PriorityType
  ) => {
    setId(id);
    setTitle(title);
    setDescription(description);
    setPriority(priority);
    setIsPopupOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_TASK", id });
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  let filteredTasks =
    state.filter === "All"
      ? state.tasks
      : state.tasks.filter((task) => task.priority === state.filter);

  if (state.search) {
    filteredTasks = state.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(state.search.toLowerCase()) ||
        task.description.toLowerCase().includes(state.search.toLowerCase())
    );
  }

  return (
    <TaskListContainer>
      {filteredTasks.length === 0 && <TaskListP>No Tasks available.</TaskListP>}
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
      {isPopupOpen && (
        <TaskPopup
          id={id}
          title={title}
          description={description}
          priority={priority}
          handlePopupClose={handlePopupClose}
        />
      )}
    </TaskListContainer>
  );
};

export default TaskList;
