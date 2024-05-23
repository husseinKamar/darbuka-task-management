import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, duration: number = 4000, action: string = 'OK') {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
