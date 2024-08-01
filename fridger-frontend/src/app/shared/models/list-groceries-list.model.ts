import { ListModel } from '../components/list/list.model';
import { GroceriesList, GroceriesListIngredient } from './groceries-list';

export class ListGroceriesList extends GroceriesList implements ListModel {
  constructor(
    public label: string,
    startDate: string,
    endDate: string,
    ingredients: GroceriesListIngredient[],
    id?: number
  ) {
    super(startDate, endDate, ingredients, id);
  }
}
