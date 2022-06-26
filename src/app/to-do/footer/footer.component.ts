import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from '../services/to-do.service';
import { FilterEnum } from '../types/filter.enum';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  noTodoClass: Observable<boolean>;
  activeCount:Observable<number>;
  itemLeftText:Observable<string>;
  filterEnum=FilterEnum;
  filter:Observable<FilterEnum>;
  constructor(private _todoService: TodoService) {
    this.activeCount=this._todoService.todo.pipe(
      map((todo)=>todo.filter((todo)=>!todo.isCompleted).length)
    );
    this.itemLeftText=this.activeCount.pipe(
      map((activeCount) =>`item${activeCount !==1?'s':''}`)
    );
    this.noTodoClass=this._todoService.todo.pipe(
      map((todo)=>todo.length===0)
    );
    this.filter=this._todoService.filter;
   }
changeFilter(event:Event, filterName:FilterEnum):void{
  event.preventDefault();
  this._todoService.changeFilter(filterName);
}
  ngOnInit(): void {
  }

}
