import { Component, OnInit } from '@angular/core';
import MovieBase from '../../models/MovieBase';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit{

  /* ---- Array de peliculas a mostrar ---- */
  recentMovies : MovieBase[] = [];
  popularMovies : MovieBase[] = [];
  upcomingMovies : MovieBase[] = [];

  /* -- Pagina actual de cada Lista -- */
  currentPageRecent = 1;
  currentPagePopular = 1;
  currentPageUpcoming = 1;

  /* ====== Contructor | ngOnInit ====== */
  constructor(private mService : MovieService) {}

  ngOnInit(): void {
    this.loadRecentMovies();
  }

  /* -------- Metodo para cargar las peliculas actuales -------- */
  loadRecentMovies() : void {
    this.mService.getRecentMovies(this.currentPageRecent).subscribe({
      next : (data) => this.recentMovies = data,
      error : (e) => console.error(e)
    })
  }

  loadPopularMovies() : void {
    this.mService.getPopularMovies(this.currentPagePopular).subscribe({
      next : (data) => this.popularMovies = data,
      error : (e) => console.error(e)
    })
  }

  loadUpcomingMovies() : void {
    this.mService.getPopularMovies(this.currentPageUpcoming).subscribe({
      next : (data) => this.upcomingMovies = data,
      error : (e) => console.error(e)
    })

  }


}
