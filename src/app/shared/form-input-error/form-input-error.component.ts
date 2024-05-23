import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input-error',
  templateUrl: './form-input-error.component.html',
  styleUrls: ['./form-input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// component responsible for form input fields error messages
export class FormInputErrorComponent {
  @Input() errors: any = {};

  constructor() {}

  ngOnInit(): void {}

  getMessage(errorItem: any): string | null {
    if (errorItem?.value?.message) return errorItem.value.message;
    return null;
  }
}
