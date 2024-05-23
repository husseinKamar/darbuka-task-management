import { Injectable } from '@angular/core';
import { LoginPayload } from '../contracts/login.payload';
import { StorageHelper } from '../helpers/storage.helper';
import { Observable, delay, of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService, private router: Router) {}
  private storage = new StorageHelper();

  public authanticate(userCredentials: LoginPayload): Observable<string> {
    const url = `users?email=${userCredentials.email}&password=${userCredentials.password}`;

    return this.api.get(url);

    // this.storage.set('token', userCredentials.email);
    // return of('authorized').pipe(delay(2000));
  }

  public logOut() {
    this.storage.remove('token');
    this.router.navigate(['/auth']);
  }
}
