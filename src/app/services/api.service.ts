import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ITodo } from '../models/iTodo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers:HttpHeaders;
  private readonly apiUrl = "https://auto.loanvantage360.com/fps/api/";
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    let authorizationData = "Basic " + btoa("c46eea3d-cc16-40c0-9096-62b0a7b1e3c3" + ":" + "e15483af-988d-4753-bb59-926e8d00f433");
    this.headers = this.headers.set('Authorization', authorizationData);
   }

  getAllTodos() {
    return this.httpClient.get(this.apiUrl + 'todo', {headers: this.headers});
  }

  compltedeTodo(todo: ITodo) {
    return this.httpClient.put(this.apiUrl + 'todo', todo , {headers: this.headers});
  }

  deleteTodo(todo: ITodo) {
    return this.httpClient.delete(this.apiUrl + 'todo/' + todo.id, {headers: this.headers});
  }

  createTodo(todo: ITodo) {
    return this.httpClient.post(this.apiUrl + 'todo', todo, {headers: this.headers});
  }
}
