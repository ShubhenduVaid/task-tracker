import styled from "styled-components";

import { PriorityType } from "./Task";

const getPriorityColor = (priority: PriorityType) => {
  switch (priority) {
    case "Low":
      return "green";
    case "Medium":
      return "darkslategrey";
    case "High":
      return "red";
  }
};

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: rgba(242, 235, 235, 0.5);
  border-radius: 8px;
  box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const TaskTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
`;

export const TaskDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

export const TaskPriority = styled.h2<{ priority: PriorityType }>`
  font-size: 13px;
  color: ${({ priority }) => getPriorityColor(priority)};
`;
