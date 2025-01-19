import styled from "styled-components";

export const TaskFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: rgba(242, 235, 235, 0.5);
  border-radius: 8px;
  box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.8rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
