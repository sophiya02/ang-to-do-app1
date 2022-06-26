import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodocompComponent } from './todocomp/todocomp.component';
import { HeaderComponent } from './header/header.component';
import { MaterialExampleModule } from "../ang-material-module/ang-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { TodoService } from "./services/to-do.service";
import { MainComponent } from './main/main.component';
import { CommonModule } from "@angular/common";
import { FooterComponent } from './footer/footer.component';
import { TodoComponent } from './todo/todo.component';

const routes:Routes=[
    {
        path:'',
        component:TodocompComponent
    }
]
@NgModule({
    declarations:[
    TodocompComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    TodoComponent
    
  ],
    imports:[
        BrowserModule,
        CommonModule,
        RouterModule.forChild(routes),
        BrowserAnimationsModule,
        MaterialExampleModule
    ],
    providers:[
        TodoService
    ]
})
export class ToDoModule {}