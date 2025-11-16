import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MovieDetails } from '../../models/MovieDetails';
import { Review } from '../../models/Review';
import { ReviewModal } from "../../components/review-modal/review-modal";
import { ReviewService } from '../../services/review-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-movie-sheet',
  imports: [ReviewModal],
  templateUrl: './movie-sheet.html',
  styleUrl: './movie-sheet.css'
})

export class MovieSheet implements OnInit{
  // * ======== Variables ========
  chosenMovie!: MovieDetails
  reviews : Review[] = []
  isModalOpen = signal(false) // Variable reactiva (cuando cambia su valor, Angular actualiza automáticamente la vista)

  // * ======== Contructor | ngOnInit ========
  constructor(private route: ActivatedRoute,
    private mService: MovieService,
    private rService: ReviewService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Conseguimos el ID de la pelicula desde la URL
    const movieId = this.route.snapshot.params['id']

    // Cargamos la pelicula y sus reviews
    this.loadMovie(movieId)
    this.loadReviews(movieId)
  }

  // ! -------- Metodo para cargar la pelicula -------- 
  loadMovie(id: number){
    this.mService.getMovieById(id).subscribe({
      next: (data) => { this.chosenMovie = data },
      error: (e) => { console.error(e) }
    })
  }

  // ! -------- Metodo para cargar las reviews -------- 
  loadReviews(movieId: number){
    this.rService.getReviewsForMovie(movieId).subscribe({
      next: (data) => {this.reviews = data},
      error: (e) => console.error(e)
    })
  }

  hasReview(){
    
  }

  // ! ====== Metodos para el Model ======
  openModal(){
    this.isModalOpen.set(true)
  }

  closeModal(){
    this.isModalOpen.set(false)
  }

  // * -------- Metodo para reemplazar posters sin imagen --------
  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/default-poster.jpg';
  }
}
