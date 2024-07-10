import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlannedRecipe } from '../common/planned-recipe';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../common/api-response';

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
  ): Observable<ApiResponse<PlannedRecipe>> {
    return this.httpClient.post<ApiResponse<PlannedRecipe>>(this.url, data);
  }

  updatePlannedRecipe(data: any): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(this.url, data);
  }
}
