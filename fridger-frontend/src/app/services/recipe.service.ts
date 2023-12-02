import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../common/recipe';
import { environment } from '../../environments/environment';

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

  createRecipe(recipe: Recipe): Observable<PostRecipeResponse> {
    return this.httpClient.post<PostRecipeResponse>(this.url, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<PostRecipeResponse> {
    return this.httpClient.put<PostRecipeResponse>(this.url, recipe);
  }

  deleteRecipe(recipeId: number): Observable<DeleteRecipeResponse> {
    const url = `${this.url}/${recipeId}`;

    return this.httpClient.delete<DeleteRecipeResponse>(url);
  }

  toggleFavorite(recipe: Recipe): Observable<PostRecipeResponse> {
    const url = `${this.url}/favorite`;

    return this.httpClient.put<PostRecipeResponse>(url, recipe);
  }
}

interface PostRecipeResponse {
  data: Recipe;
  message: string;
}

interface DeleteRecipeResponse {
  message: string;
}
