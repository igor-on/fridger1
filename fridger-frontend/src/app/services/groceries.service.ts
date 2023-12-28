import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GroceriesList } from '../common/groceriesList';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  private url = `${environment.apiUrl}/groceries`;

  constructor(private httpClient: HttpClient) {}

  generateGroceriesList(
    startDate: string,
    endDate: string
  ): Observable<GenerateGroceriesResponse> {
    const url = `${this.url}/ingredients-list`;
    return this.httpClient.get<GenerateGroceriesResponse>(url, {
      params: { startDate: startDate, endDate: endDate },
    });
  }

  getGroceriesList(): Observable<GetGroceriesResponse> {
    const url = `${this.url}/list`;

    return this.httpClient.get<GetGroceriesResponse>(url);
  }
}

interface GenerateGroceriesResponse {
  data: { ingredientName: string; quantity: number; unit: string }[];
  message: string;
}

interface GetGroceriesResponse {
  data: GroceriesList[];
  message: string;
}
