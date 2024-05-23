import { NgModule } from '@angular/core';
import { TaskManagementRoutingModule } from './task-management-routing.module';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListingComponent } from './task-listing/task-listing.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { TaskService } from 'src/app/core/services/tasks.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormInputErrorModule } from 'src/app/shared/form-input-error/form-input-error.module';

@NgModule({
  declarations: [TaskListingComponent, AddEditTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TaskManagementRoutingModule,
    FormInputErrorModule,

    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [TaskService],
})
export class TaskManagementModule {}
