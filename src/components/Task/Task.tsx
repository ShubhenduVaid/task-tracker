import React from "react";

import { TaskContainer, TaskTitle, TaskDescription } from "./";

export type PriorityType = "Low" | "Medium" | "High";

interface TaskProps {
  title: string;
  description: string;
  priority: PriorityType;
}

const Task: React.FC<TaskProps> = ({ title, description, priority }) => {
  return (
    <TaskContainer>
      <TaskTitle>{title}</TaskTitle>
      <TaskDescription>{description}</TaskDescription>
      <p>Priority: {priority}</p>
    </TaskContainer>
  );
};

export default Task;
