import React, { useEffect, useState } from "react";

import { PriorityType } from "../Task";
import {
  TaskFormButton,
  TaskFormInput,
  TaskFormSelect,
  TaskFormContainer,
} from "./TaskForm.style";
import { useTaskContext } from "../../contexts/TaskContext";

interface TaskPopupProps {
  existingTask?: {
    id: string;
    title: string;
    description: string;
    priority: PriorityType;
  };
  handleUpdate: () => void;
}

const TaskForm: React.FC<TaskPopupProps> = ({ existingTask, handleUpdate }) => {
  const { dispatch } = useTaskContext();

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<PriorityType>("Low");

  useEffect(() => {
    if (existingTask) {
      setId(existingTask.id);
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingTask) {
      dispatch({
        type: "EDIT_TASK",
        task: { id, title, description, priority },
      });
      handleUpdate();
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        priority,
      };
      dispatch({ type: "ADD_TASK", task: newTask });
    }

    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <TaskFormContainer onSubmit={handleSubmit}>
      <TaskFormInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TaskFormInput
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <TaskFormSelect
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as PriorityType)}
      >
        <option value="" disabled>
          Select Priority
        </option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </TaskFormSelect>
      <TaskFormButton type="submit">
        {existingTask ? "Update Task" : "Add Task"}
      </TaskFormButton>
    </TaskFormContainer>
  );
};

export default TaskForm;
