import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.scss'],
})
export class TaskListingComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.reloadTasks();
  }

  openAddTask() {
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((doReload) => {
      if (doReload) this.reloadTasks();
    });
  }
  reloadTasks() {
    console.log('reloadTasks called')
  }
}
