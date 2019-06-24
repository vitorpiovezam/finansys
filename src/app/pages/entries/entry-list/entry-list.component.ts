import { Component, OnInit, Injector } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})

export class EntryListComponent extends BaseResourceListComponent<Entry> implements OnInit {

  entries: Entry[] = [];

  constructor(
    injector: Injector,
    entryService: EntryService
    ) {
      super(injector, entryService);
    }

  ngOnInit() {
    super.ngOnInit();
  }

}
