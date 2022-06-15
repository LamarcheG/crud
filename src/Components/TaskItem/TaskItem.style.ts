import styled from "styled-components";

export const TaskItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: fit-content;
  border-radius: 10px;
  margin: auto;
  & p {
    padding: 0px 10px;
  }
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 2px 0px;
`;

export const FormEntry = styled.div`
  padding: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  height: 110px;
`;
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const DeleteButton = styled.button`
  border-color: var(--tertiary-color);
  background-color: var(--background-color);
  border-radius: 50%;
  padding: 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    width: 50px;
    aspect-ratio: unset;
    border-radius: 5px;
    padding: 5px 0px;
    background-color: var(--secondary-color);
    border: none;
    color: var(--text-color);
  }
  &:hover span {
    display: none;
  }
  &:hover::before {
    content: "Delete";
  }
`;
export const EditButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: var(--secondary-color);
  padding: 5px 10px;
  color: var(--text-color);
  transition: all 0.2s ease-in-out;
  margin: 0px 5px;
  &:hover {
    background-color: var(--secondary-color);
    color: var(--text-color);
    transform: scale(1.05);
  }
`;
export const SaveButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: var(--secondary-color);
  padding: 5px 10px;
  color: var(--text-color);
  transition: all 0.2s ease-in-out;
  margin: 0px 5px;
  &:hover {
    background-color: var(--secondary-color);
    color: var(--text-color);
    transform: scale(1.02);
  }
`;
