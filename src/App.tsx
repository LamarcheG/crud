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
        {recipes &&
          recipes.map((recipe) => <p key={recipe.id}>{recipe.name}</p>, [])}
      </header>
    </div>
  );
}

export default App;
