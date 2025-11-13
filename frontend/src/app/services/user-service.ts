import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserPreview from '../models/UserPreview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //URL del backend
  private URL = 'http://localhost:8080/users'

  constructor(private http: HttpClient) {}

  //Obtengo la lista de usuarios
  //Observable sirve para representar un valor que llegará en el futuro (asincrono)
  getUsers(): Observable<UserPreview[]> {
    return this.http.get<UserPreview[]>(`${this.URL}/all`)
  }
}
