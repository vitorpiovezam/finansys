import { CategoryService } from './../../categories/shared/category.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../shared/entry.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Category } from '../../categories/shared/category.model';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})

export class EntryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: Boolean = false;
  entry: Entry = new Entry();
  categories: Category[] = [];

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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.getCategories();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  private getCategories() {
    this.categoryService.getAll().subscribe(
      (categories) => this.categories = categories
    );
  }

  private setPageTitle() {
    if (this.currentAction === 'edit') {
      this.pageTitle = 'Editar ' + this.entry.name || ' ';
    } else {
      this.pageTitle = 'Nova categoria';
    }
  }

  private setCurrentAction() {
    this.currentAction = this.route.snapshot.url[0].path;
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
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

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      )
        .subscribe(
          (entry) => {
            this.entry = entry;
            this.entryForm.patchValue(this.entry);
          },
          (error) => alert('Erro' + error)
        );
    } else {

    }
  }

  private createEntry() {
    const entry: Entry = Entry.fromJson(this.entryForm.value);

    this.entryService.create(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  private updateEntry() {
    const entry: Entry = Entry.fromJson(this.entryForm.value);

    this.entryService.update(entry)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  private actionsForSuccess(entry: Entry) {
    const message = `A categoria ${entry.name} foi cadastrada com sucesso`;

    toastr.success(message);
    this.router.navigateByUrl('entries', { skipLocationChange: true })
      .then(
        () => this.router.navigate(['entries', 'edit', entry.id])
      );
  }

  private actionsForError(error: any) {
    toastr.error('Erro', error);
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor'];
    }

  }
}
