import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogModule } from './shared/confirmation-dialog/confirmation-dialog.module';
import { FormInputErrorModule } from './shared/form-input-error/form-input-error.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    ConfirmationDialogModule,
    FormInputErrorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
