import { IRecipe } from "interfaces/interface";
import Recipe from "./Recipe";

interface AppProps {
  recipes: IRecipe[];
}

function RecipeList(props: AppProps) {
  return (
    <>
      <ul>
        {props.recipes &&
          props.recipes.map((recipe: IRecipe) => (
            <li key={recipe.id}>
              <Recipe recipe={recipe}></Recipe>
            </li>
          ))}
      </ul>
    </>
  );
}

export default RecipeList;
