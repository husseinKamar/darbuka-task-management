import { NgModule } from '@angular/core';
import { TaskManagementRoutingModule } from './task-management-routing.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
    MatDialogModule,
  ],
  providers: [],
})
export class TaskManagementModule {}
