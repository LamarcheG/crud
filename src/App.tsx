import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { IRecipe } from "interfaces/interface";

function App() {
  const recipesArray: IRecipe[] = [
    {
      id: 1,
      name: "Pizza",
      description:
        "A pizza is a flatbread typically topped with tomato sauce and cheese and baked in an oven.",
      ingredients: [
        { id: 1, name: "dough", quantity: 1 },
        { id: 2, name: "tomato", quantity: 2 },
        { id: 3, name: "cheese", quantity: 1 },
      ],
      steps: [
        { id: 1, description: "Preheat oven to 400 degrees" },
        { id: 2, description: "Mix ingredients" },
        { id: 3, description: "Bake for 20 minutes" },
      ],
    },
    {
      id: 2,
      name: "Spaghetti",
      description:
        "Spaghetti is a type of pasta, typically a short, cylindrical noodle.",
      ingredients: [
        { id: 1, name: "pasta", quantity: 1 },
        { id: 2, name: "tomato", quantity: 2 },
      ],
      steps: [
        { id: 1, description: "Preheat oven to 400 degrees" },
        { id: 2, description: "Mix ingredients" },
        { id: 3, description: "Bake for 10 minutes" },
      ],
    },
    {
      id: 3,
      name: "Lasagna",
      description:
        "Lasagna is a type of pasta, typically a short, cylindrical noodle.",
      ingredients: [
        { id: 1, name: "pasta", quantity: 1 },
        { id: 2, name: "sauce", quantity: 2 },
        { id: 3, name: "cheese", quantity: 1 },
      ],
      steps: [
        { id: 1, description: "Preheat oven to 400 degrees" },
        { id: 2, description: "Mix ingredients" },
        { id: 3, description: "Bake for 30 minutes" },
      ],
    },
  ];
  useEffect(() => {
    if (localStorage.getItem("recipes") === null) {
      localStorage.setItem("recipes", JSON.stringify(recipesArray));
    }
    setRecipes(
      JSON.parse(localStorage.getItem("recipes") || "[]") as IRecipe[]
    );
  }, []);

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {recipes &&
          recipes.map((recipe) => <p key={recipe.id}>{recipe.name}</p>, [])}
      </header>
    </div>
  );
}

export default App;
