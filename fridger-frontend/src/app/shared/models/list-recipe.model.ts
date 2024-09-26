import { ListModel } from '../components/list/list.model';
import { Recipe, RecipeIngredient } from './recipe';

export class ListRecipe extends Recipe implements ListModel {
  constructor(
    public label: string,
    id: number,
    name: string,
    description: string,
    instructions: string,
    imageUrl: string,
    link: string,
    recipeIngredients: RecipeIngredient[],
    favorite: boolean
  ) {
    super(
      id,
      name,
      description,
      instructions,
      imageUrl,
      link,
      recipeIngredients,
      favorite
    );
  }
}
