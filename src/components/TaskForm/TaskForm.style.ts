import styled from "styled-components";
import Select from "react-select";

export const TaskFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 16px;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: rgba(242, 235, 235, 0.5);
  border-radius: 8px;
  box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.1);
`;

export const TaskFormInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const TaskFormSelect = styled(Select)`
  .Select__control {
    height: 40px;
    width: 100%;
    border: 1px solid #a1a1a1;
    border-radius: 0;
    cursor: pointer;
  }

  .Select__control:hover {
    border-color: #a1a1a1;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0 1px black;
    outline: none;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    color: #3c3d3e;
  }
`;

export const TaskFormButton = styled.button`
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

export const TaskFormPriorityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`;
