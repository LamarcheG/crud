import styled from "styled-components";

export const AppContainer = styled.div`
  text-align: center;
  color: var(--text-color);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid var(--tertiary-color);
  border-radius: 10px;
  width: 30%;
  margin: 50px auto;
  height: 150px;
  padding: 10px 0px;
`;

export const FormEntry = styled.div`
  & input {
    padding: 5px;
    border-radius: 4px;
    border: 2px solid var(--secondary-color);
  }
`;

export const AddButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: var(--secondary-color);
  padding: 5px 50px;
  color: var(--text-color);
  font-size: 1.2rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: var(--secondary-color);
    color: var(--text-color);
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.92);
  }
`;

export const ListTodo = styled.ul`
  width: 80%;
  margin: 0 auto;
  padding: 0;
  list-style: none;

  &::before {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--secondary-color);
    margin: 0 auto;
    margin-bottom: 30px;
  }
  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--secondary-color);
    margin: 0 auto;
    margin-top: 30px;
  }
`;

export const ListTodoItem = styled.li`
  width: max(40%, 400px);
  margin: 0 auto;
  text-align: center;
  &:not(:first-child) {
    &::before {
      content: "";
      display: block;
      width: 100%;
      margin: 0 auto;
      height: 1px;
      background-color: var(--tertiary-color);
    }
  }
`;
