import React from "react";

import { TaskListContainer } from "./TaskList.style";
import { PriorityType, Task, TaskProps } from "../Task";

export interface TaskListProps {
  tasks: TaskProps[];
  filter?: PriorityType;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, filter = "" }) => {
  const filteredTasks = filter
    ? tasks.filter((task) => task.priority === filter)
    : tasks;

  if (filteredTasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <TaskListContainer>
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
        />
      ))}
    </TaskListContainer>
  );
};

export default TaskList;
