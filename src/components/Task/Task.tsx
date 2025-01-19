import React from "react";

import {
  TaskContainer,
  TaskTitle,
  TaskDescription,
  TaskPriority,
} from "./Task.style";

export type PriorityType = "Low" | "Medium" | "High";

export interface TaskProps {
  id?: number;
  title: string;
  description: string;
  priority: PriorityType;
}

const Task: React.FC<TaskProps> = ({ title, description, priority }) => {
  return (
    <TaskContainer>
      <TaskTitle>{title}</TaskTitle>
      <TaskDescription>{description}</TaskDescription>
      <TaskPriority priority={priority}>{priority}</TaskPriority>
    </TaskContainer>
  );
};

export default Task;
