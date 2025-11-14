import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserPreview from '../models/UserPreview';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { RegisterRequest } from '../models/RegisterRequest';

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

  //Perfil público
  getUserProfile(username: string): Observable<User>{
    return this.http.get<User>(`${this.URL}/${username}`)
  }

  //Perfil propio
  getMyProfile(): Observable<User>{
    return this.http.get<User>(`${this.URL}/me`)
  }
}
