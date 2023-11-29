import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  private url = `${environment.apiUrl}/groceries`;

  constructor(private httpClient: HttpClient) {}

  getGroceriesList(
    startDate: string,
    endDate: string
  ): Observable<GetGroceriesResponse> {
    const url = `${this.url}/ingredients-list`;
    return this.httpClient.get<GetGroceriesResponse>(url, {
      params: { startDate: startDate, endDate: endDate },
    });
  }
}

interface GetGroceriesResponse {
  data: { ingredientName: string; quantity: number; unit: string }[];
  message: string;
}
