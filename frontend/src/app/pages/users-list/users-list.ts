import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/User';
import UserPreview from '../../models/UserPreview';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [RouterLink],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList implements OnInit{
  users: UserPreview[] = []

  public RoleEnum = Role

  currentPage = 1

  constructor(private uService: UserService){}

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void{
    this.uService.getUsers().subscribe({
      next: (data) => {
        this.users = data
      },
      error: (e) => console.error(e)
    })
  }

  //Funciones para cambiar de pagina

  //Siguiente 
  nextPage(): void {
    this.currentPage++
    this.loadUsers()
    this.scrollToTop()
  }

  //Anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.loadUsers()
      this.scrollToTop()
    }
  }

  //Para regresar hacia arriba
  private scrollToTop(): void {
    window.scrollTo(0, 0)
  }
}
