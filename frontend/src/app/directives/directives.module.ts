import { NgModule } from '@angular/core';
import { SortableDirective } from './sortable/sortable.directive';

@NgModule({
  exports: [SortableDirective],
  declarations: [SortableDirective],
})
export class DirectivesModule { }
