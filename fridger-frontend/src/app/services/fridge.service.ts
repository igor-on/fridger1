import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../shared/models/api-response';
import { Fridge, FridgeIngredient } from '../shared/models/fridge';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  private url = `${environment.apiUrl}/fridge`;

  constructor(private httpClient: HttpClient) {}

  public getFridge(): Observable<ApiResponse<Fridge>> {
    return this.httpClient.get<ApiResponse<Fridge>>(this.url);
  }

  public postIngredients(
    ingredients: FridgeIngredient[]
  ): Observable<ApiResponse<Fridge>> {
    return this.httpClient.post<ApiResponse<Fridge>>(
      `${this.url}/ingredients`,
      ingredients
    );
  }
  public putIngredients(
    ingredients: FridgeIngredient[]
  ): Observable<ApiResponse<Fridge>> {
    return this.httpClient.put<ApiResponse<Fridge>>(
      `${this.url}/ingredients`,
      ingredients
    );
  }

  public deleteIngredient(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.url}/ingredients/${id}`);
  }
}
