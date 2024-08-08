import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GroceriesList } from '../shared/models/groceries-list';
import { ApiResponse } from '../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  private url = `${environment.apiUrl}/groceries-list`;

  constructor(private httpClient: HttpClient) {}

  generateGroceriesList(params: {
    startDate: string;
    endDate: string;
    withFridge: boolean;
  }): Observable<ApiResponse<GroceriesList>> {
    const url = `${this.url}/generate`;
    return this.httpClient.get<ApiResponse<GroceriesList>>(url, {
      params: { ...params },
    });
  }

  getGroceriesList(): Observable<ApiResponse<GroceriesList[]>> {
    return this.httpClient.get<ApiResponse<GroceriesList[]>>(this.url);
  }
}
