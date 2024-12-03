import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'todos';

  constructor() {}

  getTodos(): Task[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTodos(todos: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
