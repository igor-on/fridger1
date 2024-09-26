import { FridgeIngredient } from './fridge';

export class GroceriesList {
  constructor(
    public startDate: string,
    public endDate: string,
    public ingredients: GroceriesListIngredient[],
    public fridgeIngredients: GroceriesListFridgeIngredient[],
    public withFridge: boolean,
    public fridgeStateDate: Date,
    public id?: number
  ) {}
}

export class GroceriesListIngredient {
  constructor(
    public quantity: number,
    public unit: string,
    public ingredientName: string,
    public id?: number
  ) {}
}

export type GroceriesListFridgeIngredient = Omit<
  FridgeIngredient,
  'ingredient'
> & {
  ingredientName: string;
};
