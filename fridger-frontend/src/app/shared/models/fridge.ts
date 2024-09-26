import { Ingredient } from './recipe';
import * as moment from 'moment';

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
    public insertDate: string,
    public open: boolean,
    public afterOpeningExpirationDate: string,
    public expirationDate?: string
  ) {}

  public static convertDatesToLocal(i: FridgeIngredient): void {
    if (i.expirationDate !== null) {
      i.expirationDate = moment(i.expirationDate).format('YYYY-MM-DDTHH:mm:ss');
    }
    if (i.insertDate !== null) {
      i.insertDate = moment(i.insertDate).format('YYYY-MM-DDTHH:mm:ss');
    }
    if (i.afterOpeningExpirationDate !== null) {
      i.afterOpeningExpirationDate = moment(
        i.afterOpeningExpirationDate
      ).format('YYYY-MM-DDTHH:mm:ss');
    }
  }
}
