import { RouterModule } from '@angular/router';
import { IMaskModule } from 'angular-imask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { BaseResourceListComponent } from './components/base-resource-list/base-resource-list.component';
import { NavigationPaneComponent } from '../core/components/navigation-pane/navigation-pane.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BreadCrumbComponent,
    NavigationPaneComponent
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    IMaskModule,
    BreadCrumbComponent,
    NavigationPaneComponent
  ]
})
export class SharedModule { }
