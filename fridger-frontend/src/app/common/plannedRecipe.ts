import { Recipe } from './recipe';

export interface PlannedRecipe {
  id?: number;
  plannedDate: string;
  recipe: Recipe;
  done: boolean;
}
