import { Pipe, PipeTransform } from '@angular/core';
import { FieldVisible } from '../components/dynamic-form/template-form-field';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, mergeMap, Observable, of } from 'rxjs';

@Pipe({
  name: 'fieldVisible',
  standalone: true,
})
export class FieldVisiblePipe implements PipeTransform {
  transform(
    fieldVisible?: FieldVisible,
    form?: FormGroup
  ): Observable<boolean> {
    if (fieldVisible === undefined) {
      return of(true);
    }

    if (typeof fieldVisible === 'boolean') {
      return of(fieldVisible);
    }

    const topLevelForm = this.getTopLevelForm(form!);

    const sub$ = new BehaviorSubject<boolean | Observable<any>>(
      fieldVisible(topLevelForm)
    );

    topLevelForm.valueChanges.subscribe(value => {
      sub$.next(fieldVisible(topLevelForm));
    });

    return sub$.pipe(mergeMap(it => (typeof it === 'boolean' ? of(it) : it)));
  }

  private getTopLevelForm(form: FormGroup): FormGroup {
    const parent = form.parent as FormGroup;

    if (parent) {
      return this.getTopLevelForm(parent);
    }

    return form;
  }
}
