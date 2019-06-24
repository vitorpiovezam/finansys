import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource-model';
import { BaseResourceService } from '../../services/base-resource-service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel>  implements OnInit {

  public resources: T[] = [];
  public injector: Injector;
  public resourceService: BaseResourceService<T>;

  constructor(
    injector: Injector,
    resourceService: BaseResourceService<T>,
  ) {
    this.injector = injector;
    this.resourceService = resourceService;
  }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert('List Error')
    );
  }

  deleteResource(resource: any) {
    const mustDelete = confirm('Deseja realmente exluir este item ?');

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        () => alert('Error')
      );
    }
  }

}
