import styled from "styled-components";

export const SearchBarInput = styled.input`
  padding: 10px;
  width: 50%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;
