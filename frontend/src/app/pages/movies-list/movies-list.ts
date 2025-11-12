import { Component, OnInit } from '@angular/core';
import MovieBase from '../../models/MovieBase';
import { MovieService } from '../../services/movie-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  imports: [RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css'
})
export class MoviesList implements OnInit {

  movies: MovieBase[] = []

  currentPage = 1

  public hasMorePages: boolean = false

  constructor(public mService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  //Funcion para cargar las peliculas actuales
  loadMovies(): void {
    this.mService.getAllMovies(this.currentPage).subscribe({
      next: (data) => {
        this.movies = data,
        this.hasMorePages = data.length === 20},
      error: (e) => console.error(e)
    })
  }

  //Funciones para cambiar de pagina

  //Siguiente 
  nextPage(): void {
    this.currentPage++
    this.loadMovies()
    this.scrollToTop()
  }

  //Anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.loadMovies()
      this.scrollToTop()
    }
  }

  //Para regresar hacia arriba
  private scrollToTop(): void {
    window.scrollTo(0, 0)
  }

  // * -------- Metodo para reemplazar posters sin imagen -------- 
  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/default-poster.jpg';
  }
}
