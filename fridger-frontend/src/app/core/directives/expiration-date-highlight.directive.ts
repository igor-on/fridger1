import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { FridgeIngredient } from '../../shared/models/fridge';

@Directive({
  selector: '[appExpirationDateHighlight]',
  standalone: true,
})
export class ExpirationDateHighlightDirective {
  @Input({ required: true }) appExpirationDateHighlight!: FridgeIngredient;

  constructor(private element: ElementRef<HTMLDivElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.updateColor();
    }, 0);
  }

  updateColor() {
    const classList = this.element.nativeElement.classList;
    const actualClass = Array.from(classList).find(c =>
      c.includes('text-light')
    );

    if (actualClass) {
      classList.remove(actualClass);
    }

    const expirationDate = this.element.nativeElement.innerText;
    const textColor =
      new Date(expirationDate) < new Date()
        ? 'text-light-red'
        : 'text-light-green';
    classList.add(textColor);
  }
}
