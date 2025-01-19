import React, { useState, useEffect } from "react";

import { PriorityType } from "../Task";
import { Button, Input, Select, TaskFormContainer } from "./TaskForm.style";

export interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    priority: PriorityType;
  }) => void;

  existingTask?: {
    id: number;
    title: string;
    description: string;
    priority: PriorityType;
  };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, existingTask }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<PriorityType>("Low");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <TaskFormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Select
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
      </Select>
      <Button type="submit">{existingTask ? "Update Task" : "Add Task"}</Button>
    </TaskFormContainer>
  );
};

export default TaskForm;
