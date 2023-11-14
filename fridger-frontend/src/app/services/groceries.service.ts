import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  private url = 'http://localhost:8080/api/groceries';

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
