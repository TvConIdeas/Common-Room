import { Component, OnInit } from '@angular/core';
import UserPreview from '../../models/UserPreview';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users-list',
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList implements OnInit{

  public allUsers: UserPreview[] = []
  public pagedUsers: UserPreview[] = []

  currentPage = 1

  itemsPerPage = 10

  constructor(public uService: UserService){}

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void{
    this.uService.getUsers().subscribe({
      next: (data) => {
        this.allUsers = data
        this.updatePage()
      },
      error: (e) => console.error(e)
    })
  }

  //Funciones para cambiar de pagina

  //Siguiente 
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++
      this.scrollToTop()
      this.updatePage()
    }
  }

  //Anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.scrollToTop()
      this.updatePage()
    }
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage

    const endIndex = startIndex + this.itemsPerPage

    this.pagedUsers = this.allUsers.slice(startIndex, endIndex)
  }

  totalPages(): number {
    if (this.allUsers.length === 0) {
      return 1
    }
    return Math.ceil(this.allUsers.length / this.itemsPerPage)
  }

  //Para regresar hacia arriba
  private scrollToTop(): void {
    window.scrollTo(0, 0)
  }
}
