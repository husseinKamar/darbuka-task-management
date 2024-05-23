import { Injectable } from '@angular/core';
import { TaskContract } from '../contracts/task.contract';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TaskPayload } from '../contracts/task.payload';

@Injectable()
export class TaskService {
  constructor(private api: ApiService) {}
  get taskBaseUrl(): string {
    return 'tasks';
  }

  public getTasks(): Observable<any> {
    return this.api.get(this.taskBaseUrl);
  }

  public addTask(taskItem: TaskPayload): Observable<any> {
    return this.api.post(this.taskBaseUrl, taskItem);
  }

  public updateTask(taskId: string, taskItem: TaskPayload): Observable<any> {
    const url = `${this.taskBaseUrl}/${taskId}`;
    return this.api.put(url, taskItem);
  }

  public deleteTask(taskId: string): Observable<any> {
    const url = `${this.taskBaseUrl}/${taskId}`;
    return this.api.delete(url);
  }
}
