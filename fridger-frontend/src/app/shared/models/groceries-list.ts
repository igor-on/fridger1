export class GroceriesList {
  constructor(
    public startDate: string,
    public endDate: string,
    public ingredients: GroceriesListIngredient[],
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
