import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { ITodo } from './models/iTodo';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todoItems:ITodo[] = [];
  todosForm!: FormGroup
  constructor(
    private apiService:ApiService,
    private formBuilder: FormBuilder, ) {}

  ngOnInit(): void {
    this.getAllTodos();
    this.todosForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isDone: [false, Validators.required],
      dueDate: ['', Validators.required],
      id:['', Validators.required]
    });
    }

  getAllTodos(): void {
    this.apiService.getAllTodos()
    .pipe(
      take(1))
    .subscribe((response:any) => {
      this.todoItems = response.data;
    });
  }

  completedTodo(todo:ITodo):void {
    todo.isDone = true;
    this.apiService.compltedeTodo(todo)
    .pipe(
      take(1))
    .subscribe(() => {})
  }

  deleteTodo(todo:ITodo):void {
    this.apiService.deleteTodo(todo)
    .pipe(
      take(1))
      .subscribe(() => {this.getAllTodos(); })
  }

  createTodo():void {
    const todoForm = this.todosForm.value;
    todoForm.dueIn = 15; // Parameter required from Backend   member this.HasErrors() = if this.DueIn = 0 then Some "DueIn is required"
    this.apiService.createTodo(todoForm)
    .pipe(
      take(1))
      .subscribe(() => {this.getAllTodos(); })
  }

}
