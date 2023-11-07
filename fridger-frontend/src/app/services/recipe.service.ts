import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../common/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = 'http://localhost:8080/api/recipes';

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
}

interface PostRecipeResponse {
  data: Recipe;
  message: string;
}

interface DeleteRecipeResponse {
  message: string;
}
