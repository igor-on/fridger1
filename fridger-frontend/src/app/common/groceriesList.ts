import { Ingredient } from './recipe';

export class GroceriesList {
  constructor(
    public id: number,
    public startDate: string,
    public endDate: string,
    public groceriesListIngredient: GroceriesListIngredient[]
  ) {}
}

class GroceriesListIngredient {
  constructor(
    public id: number,
    public quantity: number,
    public unit: string,
    public ingredient: Ingredient
  ) {}
}
