import { NgModule } from '@angular/core';
import { BaseFieldDirective } from './common/base-field.directive';



@NgModule({
  declarations: [
      BaseFieldDirective
   ],
  imports: [
  ],
  exports: [BaseFieldDirective]
})
export class DmCommonModule { }
