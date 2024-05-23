import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators, password } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginPayload } from 'src/app/core/contracts/login.payload';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({});
  private subscriptionList: Subscription[] = [];

  private isSubmitted: boolean = false;
  public isLoading: boolean = false;

  public errorMessage: string = '';
  private storage = new StorageHelper();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [
        RxwebValidators.required({ message: 'Field is required.' }),
        RxwebValidators.email({ message: 'Email not valid.' }),
      ]),
      password: new FormControl(
        null,
        RxwebValidators.required({ message: 'Field is required.' })
      ),
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const payload: LoginPayload = {
      email: this.getFormValue('email'),
      password: this.getFormValue('password'),
    };

    this.subscriptionList.push(
      this.authService.authanticate(payload).subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            this.storage.set('token', payload.email);
            this.router.navigate(['/tasks-management']);
          } else {
            this.errorMessage = 'Invalid Credentials!';
          }
          // if (res === 'authorized') {
          // }
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((element) => element.unsubscribe());
  }
}
