import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category.model';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})

export class CategoryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: Boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'edit') {
      this.pageTitle = 'Editar ' + this.category.name || ' ';
    } else {
      this.pageTitle = 'Nova categoria';
    }
  }

  private setCurrentAction() {
    this.currentAction = this.route.snapshot.url[0].path;
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(this.category);
        },
        (error) => alert('Erro' + error)
      );
    } else {

    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category)
    .subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    );
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
    .subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(category: Category) {
    const message = `A categoria ${category.name} foi cadastrada com sucesso`;

    toastr.success(message);
    this.router.navigateByUrl('categories', {skipLocationChange: true})
    .then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }

  private actionsForError(error: any) {
    toastr.error('Erro', error);
    this.submittingForm = false;

    if (error.status ===  422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor'];
    }

  }
}
