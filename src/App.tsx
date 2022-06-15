import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { IRecipe, ITask } from "interfaces/interface";
import RecipeList from "Components/RecipeList/RecipeList";
import { TaskItem } from "Components/TaskItem/TaskItem";
import {
  AddButton,
  AppContainer,
  Form,
  FormEntry,
  ListTodo,
  ListTodoItem,
} from "App.style";

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
      isDone: false,
      isEditing: false,
    };
    setTodoList([newTask, ...todoList]);
    setDeadline(0);
  };

  const onDeleteHandler = (id: number) => {
    setTodoList([...todoList.filter((task) => task.id !== id)]);
  };

  const changeEditStatus = (id: number) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          task.isEditing = !task.isEditing;
        }
        return task;
      })
    );
  };
  const changeDoneStatus = (id: number) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          task.isDone = !task.isDone;
        }
        return task;
      })
    );
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
                changeDoneStatus={changeDoneStatus}
                changeEditStatus={changeEditStatus}
              />
            </ListTodoItem>
          );
        })}
      </ListTodo>
    </AppContainer>
  );
}

export default App;
