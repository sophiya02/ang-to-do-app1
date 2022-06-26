import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/to-do.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  text:string="";
  constructor(private _todoService:TodoService) { 
   
  }

  ngOnInit(): void {
  }
  changeText(event:Event) :void
  {
    const target=event.target as HTMLInputElement;
    this.text=target.value;
    console.log(target.value);
  }
  
addTodo():void{
  this._todoService.addTodo(this.text);
  this.text="";
}

}
