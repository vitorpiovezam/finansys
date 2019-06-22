import { BaseResourceService } from 'src/app/shared/services/base-resource-service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource-model';
import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {
    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: Boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonDate: any) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.loadResource();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;
        if (this.currentAction === 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    protected setPageTitle() {
        if (this.currentAction === 'edit') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    public setCurrentAction() {
        this.currentAction = this.route.snapshot.url[0].path;
    }

    protected loadResource() {
        if (this.currentAction === 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get('id')))
            )
                .subscribe(
                    (resource) => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource);
                    },
                    (error) => alert('Erro' + error)
                );
        }
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.create(resource)
            .subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource)
            .subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected actionsForSuccess(resource: T) {
        const message = `Solicitação processada com sucesso`;
        // const route = this.route.parent.url.value[0].path;

        toastr.success(message);
        // this.router.navigateByUrl(route, { skipLocationChange: true })
        //     .then(
        //         () => this.router.navigate([route, 'edit', resource.id])
        //     );
    }

    protected actionsForError(error: any) {
        toastr.error('Erro', error);
        this.submittingForm = false;

        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ['Falha na comunicação com o servidor'];
        }
    }

    protected abstract buildResourceForm(): void;
}
