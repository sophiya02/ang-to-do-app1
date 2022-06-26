import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TodoService } from '../services/to-do.service';
import { TodoInterface } from '../types/todo.interface';

@Component({
  selector: 'app-todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo')
  todoProps!: TodoInterface;
  @Input('isEditing')
  isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<
    string | null
  > = new EventEmitter();

  editingText: string = '';
  @ViewChild('textInput')
  textInput!: ElementRef;

  constructor(private todosService: TodoService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    console.log('setTodoInEditMode');
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    console.log('removeTodo');
    this.todosService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    console.log('toggleTodo');
    this.todosService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changeText');
  }

  changeTodo(): void {
    console.log('change todo', this.editingText);
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
  
}