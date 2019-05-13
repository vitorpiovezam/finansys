import { CategoryService } from './../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource-service';
import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    protected categoryService: CategoryService
    ) {
    super('api/entries', injector, Entry.fromJson);
  }


  private setCategoryAndSendToServer(entry: Entry, sendFn: any) {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    );
  }
}
