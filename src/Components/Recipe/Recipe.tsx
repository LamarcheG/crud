import { IIngredient, IRecipe, IStep } from "interfaces/interface";

interface AppProps {
  recipe: IRecipe;
}

function Recipe(props: AppProps) {
  return (
    <>
      <div className="containerRecipe">
        <h1>{props.recipe.name}</h1>
        <p>{props.recipe.description}</p>
        <ul>
          {props.recipe.ingredients &&
            props.recipe.ingredients.map((ingredient: IIngredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
        </ul>
        <ul>
          {props.recipe.steps &&
            props.recipe.steps.map((step: IStep) => (
              <li key={step.id}>{step.description}</li>
            ))}
        </ul>
      </div>
    </>
  );
}
export default Recipe;
