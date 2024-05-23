import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, Subscription } from 'rxjs';
import { TaskContract } from 'src/app/core/contracts/task.contract';
import { TaskPayload } from 'src/app/core/contracts/task.payload';
import { TaskStatusEnum } from 'src/app/core/enums/task-status.enum';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { TaskService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({});
  private subscriptionList: Subscription[] = [];
  private isEditMode: boolean = false;
  private taskItem: TaskContract | undefined;
  public dialogTitle = 'Add Task';

  private isSubmitted: boolean = false;
  public isLoading: boolean = false;
  errorMessage: string = '';

  statusText: string = TaskStatusEnum.pending;

  constructor(
    private dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private snackBar: SnackBarService
  ) {}

  //get form control value
  getFormValue(formControlName: string): string {
    return this.form.get(formControlName)?.value as string;
  }

  // check form field if invalid and was touched to display error component
  checkFieldPristineOrDirt(formControlName: string) {
    if (
      this.form.get(formControlName)?.invalid &&
      (this.isSubmitted ||
        this.form.get(formControlName)?.touched ||
        this.form.get(formControlName)?.dirty)
    ) {
      return true;
    }
    return false;
  }

  //check task status for changes to refelect it to the label
  checkStatusChanges() {
    this.subscriptionList.push(
      this.form.get('status')?.valueChanges.subscribe({
        next: (status) => {
          this.statusText = status
            ? TaskStatusEnum.completed
            : TaskStatusEnum.pending;
        },
        error: (err) => {},
      }) as Subscription
    );
  }

  ngOnInit(): void {
    this.buildForm();
    //check if component has data which mean it is editing an already existing task
    if (this.data) {
      this.isEditMode = true;
      this.taskItem = this.data.taskItem;
      this.fillForm();
      this.statusText = this.taskItem?.status as string;
      this.dialogTitle = 'Edit Task';
    }
    this.checkStatusChanges();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      title: new FormControl(
        null,
        RxwebValidators.required({ message: 'Field is required.' })
      ),
      description: new FormControl(
        null,
        RxwebValidators.required({ message: 'Field is required.' })
      ),
      status: new FormControl(
        false,
        RxwebValidators.required({ message: 'Field is required.' })
      ),
    });
  }

  //filling task item in edit mode
  fillForm() {
    this.form.patchValue({
      title: this.taskItem?.title,
      description: this.taskItem?.description,
      status: this.taskItem?.status === TaskStatusEnum.completed ? true : false,
    });
  }
  closeDialog(doRefresh: boolean = false) {
    this.dialogRef.close(doRefresh);
  }

  //submit form if it is valid
  submitForm() {
    this.isSubmitted = true;
    this.errorMessage = '';
    //checking form validity
    if (this.form.invalid) return;
    this.isLoading = true;

    const taskItem: TaskPayload = {
      title: this.getFormValue('title'),
      description: this.getFormValue('description'),
      status: this.getFormValue('status')
        ? TaskStatusEnum.completed
        : TaskStatusEnum.pending,
    };

    this.callSubmitApi(taskItem).subscribe({
      next: (res) => {
        this.displaySuccessMessage();
        this.closeDialog(true);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  // function responsible for to call add or update api
  callSubmitApi(taskItem: TaskPayload): Observable<any> {
    if (this.isEditMode)
      return this.taskService.updateTask(this.taskItem?.id as string, taskItem);
    return this.taskService.addTask(taskItem);
  }
  displaySuccessMessage() {
    const message = this.isEditMode
      ? 'Task has been updated successfully!'
      : 'Task was added successfully!';
    this.snackBar.open(message);
  }

  ngOnDestroy(): void {
    // unsubscribe from observable object when destroying this component
    this.subscriptionList.forEach((element) => element.unsubscribe());
  }
}
