import { NgModule } from '@angular/core';
import { GenerateBgColorDirective } from '../core/directives/generate-bg-color.directive';

@NgModule({
  declarations: [GenerateBgColorDirective],
  exports: [GenerateBgColorDirective],
})
export class SharedModule {}
