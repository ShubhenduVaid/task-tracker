import styled from "styled-components";

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
`;
