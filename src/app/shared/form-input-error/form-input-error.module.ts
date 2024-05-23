import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormInputErrorComponent } from './form-input-error.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [CommonModule, MatInputModule],
  declarations: [FormInputErrorComponent],
  exports: [FormInputErrorComponent],
  providers: [],
})
export class FormInputErrorModule {}
