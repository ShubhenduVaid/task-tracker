import React, { useEffect, useState } from "react";

import { PriorityType } from "../Task";
import {
  TaskFormButton,
  TaskFormInput,
  TaskFormSelect,
  TaskFormContainer,
  TaskFormPriorityContainer,
} from "./TaskForm.style";
import { useTaskContext } from "../../contexts/TaskContext";

interface TaskPopupProps {
  existingTask?: {
    id: string;
    title: string;
    description: string;
    priority: PriorityType;
  };
  handleUpdate?: () => void;
}

const TaskForm: React.FC<TaskPopupProps> = ({ existingTask, handleUpdate }) => {
  const priorityFilterOptions = [
    { value: "All", label: "All" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];
  const options = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];
  const { dispatch } = useTaskContext();

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<PriorityType>("Low");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");

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
      handleUpdate!();
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
    <TaskFormContainer role="form" onSubmit={handleSubmit}>
      {!existingTask && (
        <TaskFormPriorityContainer>
          Priority Filter
          <TaskFormSelect
            value={{ value: priorityFilter, label: priorityFilter }}
            onChange={(prop) => {
              if (prop) {
                const { value } = prop as never;
                setPriorityFilter(value);
                dispatch({ type: "SET_FILTER", filter: value });
              }
            }}
            options={priorityFilterOptions}
          />
        </TaskFormPriorityContainer>
      )}
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
        className="select-priority"
        value={{ value: priority, label: priority }}
        onChange={(prop) => {
          if (prop) {
            const { value } = prop as never;
            setPriority(value);
          }
        }}
        options={options}
      />
      <TaskFormButton type="submit">
        {existingTask ? "Update Task" : "Add Task"}
      </TaskFormButton>
    </TaskFormContainer>
  );
};

export default TaskForm;
