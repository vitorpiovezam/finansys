import { IMaskModule } from 'angular-imask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    IMaskModule
  ],
  declarations: []
})
export class SharedModule { }
