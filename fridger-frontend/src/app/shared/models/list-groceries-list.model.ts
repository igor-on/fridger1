import { ListModel } from '../components/list/list.model';
import {
  GroceriesList,
  GroceriesListFridgeIngredient,
  GroceriesListIngredient,
} from './groceries-list';

export class ListGroceriesList extends GroceriesList implements ListModel {
  constructor(
    public label: string,
    startDate: string,
    endDate: string,
    ingredients: GroceriesListIngredient[],
    fridgeIngredients: GroceriesListFridgeIngredient[],
    withFridge: boolean,
    fridgeStateDate: Date,
    id?: number
  ) {
    super(
      startDate,
      endDate,
      ingredients,
      fridgeIngredients,
      withFridge,
      fridgeStateDate,
      id
    );
  }
}
