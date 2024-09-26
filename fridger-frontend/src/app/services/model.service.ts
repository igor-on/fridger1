import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private url = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  public getIngredientTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.url}/ingredient-types`);
  }
}
