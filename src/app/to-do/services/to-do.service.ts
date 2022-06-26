import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FilterEnum } from "../types/filter.enum";
import { TodoInterface } from "../types/todo.interface";

@Injectable()
export class TodoService{
    todo = new BehaviorSubject<TodoInterface[]>([]);
    filter = new BehaviorSubject<FilterEnum>(FilterEnum.all);
    addTodo(text:string):void{
        const newTodo: TodoInterface ={
            text,
            isCompleted: false,
            id:Math.random().toString(16),
        };
        const updatedTodo = [...this.todo.getValue(), newTodo]
        this.todo.next(updatedTodo);
    }
    toggleAll(isCompleted: boolean): void {
        console.log('isCompleted', isCompleted);
        const updatedTodos = this.todo.getValue().map((todo) => {
          return {
            ...todo,
            isCompleted,
          };
        });
        this.todo.next(updatedTodos);
      }


    changeFilter(filterName:FilterEnum):void{
        this.filter.next(filterName);
    }
    changeTodo(id: string, text: string): void {
        const updatedTodos = this.todo.getValue().map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              text,
            };
          }
    
          return todo;
        });
        this.todo.next(updatedTodos);
      }
    
      removeTodo(id: string): void {
        const updatedTodos = this.todo
          .getValue()
          .filter((todo) => todo.id !== id);
    
        this.todo.next(updatedTodos);
      }
      toggleTodo(id: string): void {
        const updatedTodos = this.todo.getValue().map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted,
            };
          }
          return todo;
        });
        this.todo.next(updatedTodos);
      }
}