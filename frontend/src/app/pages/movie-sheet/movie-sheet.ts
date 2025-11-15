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
  
  chosenMovie!: MovieDetails
  reviews!: Review[]
  isModalOpen = signal(false) // Variable reactiva (cuando cambia su valor, Angular actualiza automáticamente la vista)

  constructor(private route: ActivatedRoute,
    private mService: MovieService,
    private rService: ReviewService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.reviews = []

    const movieId = this.route.snapshot.params['id']
    this.loadMovie(movieId)
    this.loadReviews(movieId)
  }

  loadMovie(id: number){
    this.mService.getMovieById(id).subscribe({
      next: (data) => { this.chosenMovie = data },
      error: (e) => { console.error(e) }
    })
  }

  loadReviews(movieId: number){
    this.rService.getReviewsForMovie(movieId).subscribe({
      next: (data) => {this.reviews = data},
      error: (e) => console.error(e)
    })
  }

  openModal(){
    this.isModalOpen.set(true)
  }

  closeModal(){
    this.isModalOpen.set(false)
  }

  hasReview(){
    
  }
}
