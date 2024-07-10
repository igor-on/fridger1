import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../common/recipe';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../common/api-response';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = `${environment.apiUrl}/recipes`;

  constructor(private httpClient: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.url);
  }

  getRecipeDetails(recipeId: string): Observable<Recipe> {
    const url = `${this.url}/${recipeId}`;

    return this.httpClient.get<Recipe>(url);
  }

  createRecipe(recipe: Recipe): Observable<ApiResponse<Recipe>> {
    return this.httpClient.post<ApiResponse<Recipe>>(this.url, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<ApiResponse<Recipe>> {
    return this.httpClient.put<ApiResponse<Recipe>>(this.url, recipe);
  }

  deleteRecipe(recipeId: number): Observable<ApiResponse<any>> {
    const url = `${this.url}/${recipeId}`;

    return this.httpClient.delete<ApiResponse<any>>(url);
  }

  toggleFavorite(recipe: Recipe): Observable<ApiResponse<Recipe>> {
    const url = `${this.url}/favorite`;

    return this.httpClient.put<ApiResponse<Recipe>>(url, recipe);
  }

  getFavoriteRecipes(): Observable<ApiResponse<Recipe[]>> {
    const url = `${this.url}/favorite`;

    return this.httpClient.get<ApiResponse<Recipe[]>>(url);
  }
}
