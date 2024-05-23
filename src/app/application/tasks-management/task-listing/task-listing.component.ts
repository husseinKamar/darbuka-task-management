import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { TaskService } from 'src/app/core/services/tasks.service';
import { Subscription, elementAt } from 'rxjs';
import { TaskContract } from 'src/app/core/contracts/task.contract';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.scss'],
})
export class TaskListingComponent implements OnInit, OnDestroy {
  taskList: TaskContract[] = [];
  subscriptionList: Subscription[] = [];

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reloadTasks();
  }

  openAddTask() {
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      data: null,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((doReload) => {
      if (doReload) this.reloadTasks();
    });
  }
  reloadTasks() {
    this.isLoading = true;

    this.subscriptionList.push(
      this.taskService.getTasks().subscribe({
        next: (res) => {
          this.isLoading = false;
          this.taskList = res;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err;
        },
      })
    );
  }

  requestDeleteTask(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Confirmation',
        question: 'Are you sure you want to delete this task?',
      },
      width: '500px',
    });

    this.subscriptionList.push(
      dialogRef.afterClosed().subscribe({
        next: (isConfirmed) => {
          if (isConfirmed) this.deleteTaskItem(taskId);
        },
      })
    );
  }
  deleteTaskItem(taskId: string) {
    this.subscriptionList.push(
      this.taskService.deleteTask(taskId).subscribe({
        next: (res) => {
          this.reloadTasks();
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      })
    );
  }
  requestEditTask(taskItem: TaskContract) {
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      data: {
        taskItem: taskItem,
      },
      width: '500px',
    });

    this.subscriptionList.push(
      dialogRef.afterClosed().subscribe({
        next: (doReload) => {
          if (doReload) this.reloadTasks();
        },
      })
    );
  }

  logout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((element) => element.unsubscribe());
  }
}
