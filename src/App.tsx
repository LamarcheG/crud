import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { IRecipe } from "interfaces/interface";

function App() {
  var fileRecipes = require("./utility/Recipes.json");

  const recipesArray: IRecipe[] = fileRecipes;
  useEffect(() => {
    if (localStorage.getItem("recipes") === null) {
      localStorage.setItem("recipes", JSON.stringify(recipesArray));
    }
    setRecipes(
      JSON.parse(localStorage.getItem("recipes") || "[]") as IRecipe[]
    );
  }, [recipesArray]);

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
