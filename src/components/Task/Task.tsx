import React from "react";

import {
  TaskContainer,
  TaskTitle,
  TaskDescription,
  TaskPriority,
  TaskButton,
  TaskFooterContainer,
  TaskButtonContainer,
} from "./Task.style";

export type PriorityType = "Low" | "Medium" | "High";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  priority: PriorityType;
  handleEdit: (
    id: string,
    title: string,
    description: string,
    priority: PriorityType
  ) => void;
  handleDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  priority,
  handleEdit,
  handleDelete,
}) => {
  return (
    <TaskContainer>
      <TaskTitle>{title}</TaskTitle>
      <TaskDescription>{description}</TaskDescription>
      <TaskFooterContainer>
        <TaskPriority priority={priority}>{priority}</TaskPriority>
        <TaskButtonContainer>
          <TaskButton
            onClick={() => handleEdit(id, title, description, priority)}
          >
            Edit
          </TaskButton>
          <TaskButton onClick={() => handleDelete(id)}>Delete</TaskButton>
        </TaskButtonContainer>
      </TaskFooterContainer>
    </TaskContainer>
  );
};

export default Task;
