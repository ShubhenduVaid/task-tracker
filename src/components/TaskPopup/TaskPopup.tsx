import React from "react";

import {
  TaskPopupButton,
  TaskPopupContainer,
  TaskPopupOverlay,
} from "./TaskPopup.style";
import { PriorityType } from "../Task";
import { TaskForm } from "../TaskForm";

interface TaskPopupProps {
  id: string;
  title: string;
  description: string;
  priority: PriorityType;
  handlePopupClose: () => void;
}

const TaskPopup: React.FC<TaskPopupProps> = ({
  id,
  title,
  description,
  priority,
  handlePopupClose,
}) => {
  const existingTask = {
    id,
    title,
    description,
    priority,
  };
  return (
    <div className="App">
      <TaskPopupOverlay>
        <TaskPopupContainer>
          <TaskForm
            existingTask={existingTask}
            handleUpdate={handlePopupClose}
          />
          <TaskPopupButton onClick={() => handlePopupClose()}>
            Close
          </TaskPopupButton>
        </TaskPopupContainer>
      </TaskPopupOverlay>
    </div>
  );
};

export default TaskPopup;
