import { Directive, ElementRef } from '@angular/core';

let pickedColors: string[] = [];

@Directive({
  selector: '[appGenerateBgColor]',
})
export class GenerateBgColorDirective {
  colors: string[] = ['light-green', 'pink', 'green', 'orange'];

  constructor(private el: ElementRef) {
    if (pickedColors.length === 0) {
      pickedColors = [...this.colors];
    }

    (<HTMLDivElement>this.el.nativeElement).setAttribute(
      'color',
      pickedColors.pop()!
    );
  }
}
