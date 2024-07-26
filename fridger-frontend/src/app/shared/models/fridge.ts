import { Ingredient } from './recipe';

export class Fridge {
  constructor(
    public name: string,
    public fridgeIngredients: FridgeIngredient[]
  ) {}
}

export class FridgeIngredient {
  constructor(
    public id: number,
    public quantity: number,
    public unit: string,
    public ingredient: Ingredient,
    public expirationDate?: Date
  ) {}
}
