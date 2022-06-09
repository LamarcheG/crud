import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { IRecipe, ITask } from "interfaces/interface";
import RecipeList from "Components/RecipeList";
import { TaskItem } from "Components/TaskItem";

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
  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "task") {
      setTaskName(e.target.value);
    } else if (e.target.name === "deadline") {
      let date = new Date(e.target.value);
      let nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setDeadline(nextDay);
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
    setDeadline(new Date());
  };

  const onDeleteHandler = (id: number) => {
    const newTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(newTodoList);
  };

  const onEditHandler = (id: number, editedTask: ITask) => {
    if (todoList.find((task) => task.id === id)) {
      setTodoList([
        ...todoList.filter((task) => task.id !== id),
        {
          ...editedTask,
          deadline: new Date(
            editedTask.deadline.setDate(editedTask.deadline.getDate() + 1)
          ),
        },
      ]);
    }
  };
  const today = new Date();
  return (
    <div className="App">
      {/* <RecipeList recipes={recipes}></RecipeList> */}
      <form onSubmit={onSubmitHandler} className="formTask">
        <div className="inputTaskName formEntry">
          <label htmlFor="task" placeholder="Task">
            Task
          </label>
          <input
            type="text"
            name="task"
            id="task"
            value={taskName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="inputDeadline formEntry">
          <label htmlFor="deadline" placeholder="Deadline(days)">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            onChange={onChangeHandler}
            min={today.toISOString().split("T")[0]}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <ul>
        {todoList.map((task: ITask, key: number) => {
          return (
            <li key={key}>
              <TaskItem
                task={task}
                onDelete={onDeleteHandler}
                onEdit={onEditHandler}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
