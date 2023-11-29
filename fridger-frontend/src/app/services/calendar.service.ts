import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlannedRecipe } from '../common/plannedRecipe';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private url = `${environment.apiUrl}/recipes-calendar`;

  constructor(private httpClient: HttpClient) {}

  getPlannedRecipes(): Observable<PlannedRecipe[]> {
    return this.httpClient.get<PlannedRecipe[]>(this.url);
  }

  createPlannedRecipe(
    data: PlannedRecipe
  ): Observable<PostPlannedRecipeResponse> {
    return this.httpClient.post<PostPlannedRecipeResponse>(this.url, data);
  }

  updatePlannedRecipe(data: any): Observable<PutPlannedRecipeResponse> {
    return this.httpClient.put<PutPlannedRecipeResponse>(this.url, data);
  }
}

export interface PostPlannedRecipeResponse {
  data: PlannedRecipe;
  message: string;
}

interface PutPlannedRecipeResponse {
  data: any;
  message: string;
}
