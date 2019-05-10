import { SharedModule } from './../../shared/shared.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';

@NgModule({
  declarations: [EntryListComponent],
  imports: [
    EntriesRoutingModule,
    SharedModule
  ]
})
export class EntriesModule { }
