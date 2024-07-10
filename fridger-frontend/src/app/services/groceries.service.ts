import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GroceriesList } from '../common/groceries-list';
import { ApiResponse } from '../common/api-response';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  private url = `${environment.apiUrl}/groceries-list`;

  constructor(private httpClient: HttpClient) {}

  generateGroceriesList(
    startDate: string,
    endDate: string
  ): Observable<ApiResponse<GroceriesList>> {
    const url = `${this.url}/generate`;
    return this.httpClient.get<ApiResponse<GroceriesList>>(url, {
      params: { startDate: startDate, endDate: endDate },
    });
  }

  getGroceriesList(): Observable<ApiResponse<GroceriesList[]>> {
    return this.httpClient.get<ApiResponse<GroceriesList[]>>(this.url);
  }
}
