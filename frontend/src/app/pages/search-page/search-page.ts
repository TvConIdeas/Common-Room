import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import MovieBase from '../../models/MovieBase';
import { MovieService } from '../../services/movie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  imports: [RouterLink],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage implements OnInit, OnDestroy{

  movies: MovieBase[] = []
  currentPage: number = 1

  public hasMorePages: boolean = false

  // Variable para suscripcion a cambios en la ruta
  private routeSubscription !: Subscription

  constructor(
    public mService: MovieService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en los parametros de la ruta
    this.routeSubscription = this.actRoute.params.subscribe(params => {
      const searchQuery = params['query'];
      
      // Llamamos a loadMovies CADA VEZ que los params cambien
      if (searchQuery) {
        this.currentPage = 1
        this.movies = []
        this.loadMovies(searchQuery)
      }
    })
  }

  loadMovies(query: string) {
    this.mService.searchMovies(query, this.currentPage).subscribe({
      next: (data) => {
        this.movies = data
        this.hasMorePages = data.length === 20
      },
      error: (e) => {
        console.error('Error al cargar las películas:', e)
      }
    })
  }

  // Desuscribirse cuando el componente se destruye
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

    //Funciones para cambiar de pagina

  //Siguiente 
  nextPage(): void {
    this.currentPage++
    this.loadMovies(this.actRoute.snapshot.params['query'])
    this.scrollToTop()
  }

  //Anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.loadMovies(this.actRoute.snapshot.params['query'])
      this.scrollToTop()
    }
  }

  //Para regresar hacia arriba
  private scrollToTop(): void {
    window.scrollTo(0, 0)
  }
}
