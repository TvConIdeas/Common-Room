import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import MovieBase from '../../models/MovieBase';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-search-page',
  imports: [RouterLink],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage implements OnInit{

  movies: MovieBase[] = []
  currentPage: number = 1

  constructor(
    public mService: MovieService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const searchQuery = this.actRoute.snapshot.params['query']
    this.loadMovies(searchQuery)
  }

  loadMovies(query : string ) {
    this.mService.searchMovies(query, this.currentPage).subscribe({
      next: (data) => {
        this.movies = data
      },
      error: (e) => {
        console.error('Error al cargar las películas:', e);
      }
    })
  }
}
