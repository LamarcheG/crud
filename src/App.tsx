import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { IRecipe, ITask } from "interfaces/interface";
import RecipeList from "Components/RecipeList";
import { TaskItem } from "Components/TaskItem";
import styled from "styled-components";

function App() {
  // var fileRecipes = require("./utility/Recipes.json");

  // const recipesArray: IRecipe[] = fileRecipes;
  // useEffect(() => {
  //   if (localStorage.getItem("recipes") === null) {
  //     localStorage.setItem("recipes", JSON.stringify(recipesArray));
  //   }
  //   setRecipes(
  //     JSON.parse(localStorage.getItem("recipes") || "[]") as IRecipe[]
  //   );
  // }, [recipesArray]);

  // const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const toDos: ITask[] = [];

  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>(() => {
    return JSON.parse(localStorage.getItem("toDos") || "[]") as ITask[];
  });

  useEffect(() => {
    if (
      localStorage.getItem("toDos") === null ||
      localStorage.getItem("toDos")?.length === 0
    ) {
      localStorage.setItem("toDos", JSON.stringify(toDos));
    }
    setTodoList(JSON.parse(localStorage.getItem("toDos") || "[]") as ITask[]);
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(todoList));
  }, [todoList]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "task") {
      setTaskName(e.target.value);
    } else if (e.target.name === "deadline") {
      setDeadline(Number(e.target.value));
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: ITask = {
      id: todoList.length + 1,
      name: taskName,
      deadline: deadline,
    };
    setTodoList([newTask, ...todoList]);
    setTaskName("");
    setDeadline(0);
  };

  const onDeleteHandler = (id: number) => {
    const newTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(newTodoList);
  };

  const onEditHandler = (id: number, editedTask: ITask) => {
    if (todoList.find((task) => task.id === id)) {
      setTodoList([...todoList.filter((task) => task.id !== id), editedTask]);
    }
  };
  return (
    <AppContainer>
      {/* <RecipeList recipes={recipes}></RecipeList> */}
      <Form onSubmit={onSubmitHandler}>
        <FormEntry className="inputTaskName">
          <input
            type="text"
            name="task"
            id="task"
            value={taskName}
            onChange={onChangeHandler}
            placeholder="Enter task"
            required
          />
        </FormEntry>
        <FormEntry className="inputDeadline">
          <input
            type="number"
            name="deadline"
            id="deadline"
            onChange={onChangeHandler}
            placeholder="Enter deadline (in days)"
            value={deadline}
            required
          />
        </FormEntry>
        <AddButton type="submit">Add</AddButton>
      </Form>
      <ListTodo>
        {todoList.map((task: ITask, key: number) => {
          return (
            <ListTodoItem key={key}>
              <TaskItem
                task={task}
                onDelete={onDeleteHandler}
                onEdit={onEditHandler}
              />
            </ListTodoItem>
          );
        })}
      </ListTodo>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  color: var(--text-color);
`;
const Form = styled.form`
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
const FormEntry = styled.div`
  & input {
    padding: 5px;
    border-radius: 4px;
    border: 2px solid var(--secondary-color);
  }
`;
const AddButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: var(--secondary-color);
  padding: 5px 50px;
  color: var(--text-color);
  font-size: 1.2rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: var(--secondary-color);
    color: var(--text-color);
    transform: scale(1.02);
  }
`;
const ListTodo = styled.ul`
  width: 80%;
  margin: 0 auto;
  padding: 0;
  list-style: none;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--secondary-color);
    margin-bottom: 30px;
  }
  &::after {
    content: "";

    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--secondary-color);
    margin-top: 30px;
  }
`;
const ListTodoItem = styled.li`
  text-align: center;
  &:not(:first-child) {
    &::before {
      content: "";
      display: block;
      width: 60%;
      margin: 0 auto;
      height: 1px;
      background-color: var(--tertiary-color);
    }
  }
`;
