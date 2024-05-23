import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent, MatIconModule],
  providers: [],
})
export class ConfirmationDialogModule {}
