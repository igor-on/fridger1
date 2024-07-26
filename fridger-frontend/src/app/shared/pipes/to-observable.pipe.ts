import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'toObservable',
  standalone: true,
})
export class ToObservablePipe implements PipeTransform {
  transform<T>(value: T | Observable<T>): Observable<T> {
    if (value instanceof Observable) {
      return value;
    }

    return of(value);
  }
}
