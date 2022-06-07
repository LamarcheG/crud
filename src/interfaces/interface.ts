export interface IRecipe {
  id: number;
  name: string;
  description: string;
  ingredients: IIngredient[];
  steps: IStep[];
}
export interface IIngredient {
  id: number;
  name: string;
  quantity: number;
}
export interface IStep {
  id: number;
  description: string;
}
