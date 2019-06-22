import { Component, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource-model';
import { BaseResourceService } from '../../services/base-resource-service';

@Component({
  selector: 'app-base-resource-list',
  templateUrl: './base-resource-list.component.html',
  styleUrls: ['./base-resource-list.component.css']
})
export class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  public items: T[];

  constructor(
    private baseResourceService: BaseResourceService<T>
  ) { }

  ngOnInit() {
    this.baseResourceService.getAll().subscribe(
      resource => this.items = resource,
      error => alert('List Error')
    );
  }

  deleteResource(resource: any) {
    const mustDelete = confirm('Deseja realmente exluir este item ?');

    if (mustDelete) {
      this.baseResourceService.delete(resource.id).subscribe(
        () => this.items = this.items.filter(element => element !== resource),
        () => alert('Error')
      );
    }
  }

}
