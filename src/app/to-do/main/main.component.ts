import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from '../services/to-do.service';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

@Component({
  selector: 'app-todo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  visibleTodo: Observable<TodoInterface[]>;
  noTodoClass: Observable<boolean>;
  isAllTodosSelected: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodoService) {
    this.isAllTodosSelected = this.todosService.todo.pipe(
      map((todo) => todo.every((todo) => todo.isCompleted))
    );
    this.noTodoClass = this.todosService.todo.pipe(
      map((todo) => todo.length === 0)
    );
    this.visibleTodo = combineLatest([
      this.todosService.todo,
      this.todosService.filter]
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  toggleAllTodo(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
