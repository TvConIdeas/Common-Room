import { Component, OnInit } from '@angular/core';
import MovieBase from '../../models/MovieBase';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movies-list',
  imports: [],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css'
})
export class MoviesList implements OnInit {

  movies: MovieBase[] = []

  currentPage = 1

  constructor(public mService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  //Funcion para cargar las peliculas actuales
  loadMovies(): void {
    this.mService.getAllMovies(this.currentPage).subscribe({
      next: (data) => this.movies = data,
      error: (e) => console.error(e)
    })
  }

  //Funciones para cambiar de pagina

  //Siguiente 
  nextPage(): void {
    this.currentPage++;
    this.loadMovies();
  }

  //Anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }
}
