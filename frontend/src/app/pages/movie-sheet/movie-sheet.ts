import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MovieDetails } from '../../models/MovieDetails';
import { Review } from '../../models/Review';
import { ReviewModal } from "../../components/review-modal/review-modal";
import { ReviewService } from '../../services/review-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-movie-sheet',
  imports: [ReviewModal, RouterLink],
  templateUrl: './movie-sheet.html',
  styleUrl: './movie-sheet.css'
})

export class MovieSheet implements OnInit{
  // * ======== Variables ========
  chosenMovie!: MovieDetails
  reviews : Review[] = []
  isModalOpen = signal(false) // Variable reactiva (cuando cambia su valor, Angular actualiza automáticamente la vista)

  isLoggedIn = false
  currentUsername: string | null = null

  // * ======== Contructor | ngOnInit ========
  constructor(private route: ActivatedRoute,
    private mService: MovieService,
    private rService: ReviewService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Conseguimos el ID de la pelicula desde la URL
    const movieId = this.route.snapshot.params['id']

    this.isLoggedIn = this.auth.isLoggedIn()
    this.currentUsername = this.auth.getUsername()

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
  // ? ----- Cargar Reseñas -----
  loadReviews(movieId: number){
    this.rService.getReviewsForMovie(movieId).subscribe({
      next: (data) => {this.reviews = data},
      error: (e) => console.error(e)
    })
  }

  // ! -------- Metodo para borrar reviews --------
  onDeleteReview(reviewId : number){
    if(confirm('Are your sure you want to delete this review?')){
      this.rService.deleteReview(reviewId).subscribe({
        next: () => {
          alert('Review deleted succesfully.')
          this.loadReviews(this.chosenMovie.id)
        },
        error: (e) => {
          console.error(e)
          alert('Error deleting review. You might not be the owner.')
        }
      })
    }
  }

  // ? ----- Si el usuario tiene una reseña -----
  hasReview(){
    
  }

  // ! ====== Metodos para el Model ======
  openReviewModal(){
    this.isModalOpen.set(true)
  }

  closeReviewModal(){
    this.isModalOpen.set(false)
  }

  // ? ----- Para reiniciar la pagina cuando se agregue o edite -----
  refreshReviews() {
    this.loadReviews(this.chosenMovie.id);
  }

  // * -------- Metodo para reemplazar posters sin imagen --------
  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/default-poster.jpg';
  }

  // * -------- Metodo para reemplazar posters sin imagen --------
  noProfilePicture(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/user.png';
  }
}
