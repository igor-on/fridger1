import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asType',
  standalone: true,
})
export class AsTypePipe implements PipeTransform {
  constructor() {}

  transform<T>(value: any, _type: T): T {
    return value as T;
  }
}
