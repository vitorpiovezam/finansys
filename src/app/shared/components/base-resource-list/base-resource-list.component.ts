import { Component, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource-model';
import { BaseResourceService } from '../../services/base-resource-service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  public resources: T[] = [];

  constructor(
    private resourceService: BaseResourceService<T>
  ) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources.sort((a, b) => b.id = a.id),
      error => alert('List Error')
    );
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente exluir este item ?');

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        () => alert('Error')
      );
    }
  }

}
