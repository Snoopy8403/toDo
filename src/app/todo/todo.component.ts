import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from '../models/task.model';
import { TodoService } from './todo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  levels = [
    { id: 1, name: 'Normál' },
    { id: 2, name: 'Sürgős' },
    { id: 3, name: 'Blokkoló' },
  ];
  selectedOption?: number;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.tasks = this.todoService.getTodos();
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const newTodo: Task = {
      id: Date.now(),
      title: this.newTaskTitle.trim(),
      level: this.selectedOption,
      completed: false,
    };

    this.tasks.push(newTodo);
    this.todoService.saveTodos(this.tasks);
    this.newTaskTitle = '';
  }

  toggleTaskCompletion(todo: Task): void {
    todo.completed = !todo.completed;
    this.todoService.saveTodos(this.tasks);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.todoService.saveTodos(this.tasks);
  }
}
