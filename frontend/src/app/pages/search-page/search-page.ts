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
  searchQuery = ''

  constructor(
    public mService: MovieService,
    private route: ActivatedRoute,
    private router: RouterLink
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const query = params.get('query')
      if (query) {
        this.searchQuery = query
        this.loadMovies()
      }
      else {
        console.error('No se No search query was provided. ninguna consulta de búsqueda.')
      }
    })
  }

  loadMovies() {
    this.mService.searchMovies(this.searchQuery).subscribe({
      next: (data) => {
        this.movies = data
      },
      error: (err) => {
        console.error('Error al cargar las películas:', err);
      }
    })
  }
}
