import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLessTabsDirective } from './header-less-tabs.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderLessTabsDirective],
  // exports: [HeaderLessTabsDirective]
})
export class HeaderLessTabsModule { }
