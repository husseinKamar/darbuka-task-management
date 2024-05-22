import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environements/environment.dev';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public get apiBaseUrl(): string {
    return `${environment.api_base_url}/`;
  }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}${path}`);
  }

  public put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}${path}`, JSON.stringify(body));
  }

  public post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}${path}`, JSON.stringify(body));
  }

  public patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}${path}`, JSON.stringify(body));
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}${path}`);
  }
}
