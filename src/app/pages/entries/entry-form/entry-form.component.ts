import { CategoryService } from './../../categories/shared/category.service';
import { Component, OnInit, Injector } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Validators } from '@angular/forms';
import { Entry } from '../shared/entry.model';
import { Category } from '../../categories/shared/category.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})

export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService,
    injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  ngOnInit() {
    this.getCategories();
    this.buildResourceForm();
    super.ngOnInit();
  }


  private getCategories() {
    this.categoryService.getAll().subscribe(
      (categories) => this.categories = categories
    );
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null]
    });
  }
}
