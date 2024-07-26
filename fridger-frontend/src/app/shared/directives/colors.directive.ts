import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[randBgColor]',
})
export class ColorsDirective {
  colors: string[] = ['pink', 'green', 'light-green', 'orange'];

  constructor(private el: ElementRef) {
    const randomColor = this.colors[this.getRandomInt(0, this.colors.length)];
    (<HTMLDivElement>this.el.nativeElement).setAttribute('color', randomColor);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}
