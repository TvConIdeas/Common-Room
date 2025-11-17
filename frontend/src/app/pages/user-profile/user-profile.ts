import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { User } from '../../models/User';
import { ReviewService } from '../../services/review-service';
import { Review } from '../../models/Review';
import { ReviewModal } from "../../components/review-modal/review-modal";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink, ReviewModal],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit{
  // * ======== Variables ========
  selectedUser: User | null = null
  currentUsername: string | null = null
  isMyProfile = false
  isAdmin = false
  reviews: Review[] = []
  isModalOpen = signal(false)

  // * ======== Contructor | ngOnInit ========
  constructor(private route: ActivatedRoute, 
    public uService: UserService,
    private rService: ReviewService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUsername = this.auth.getUsername()
    // Suscribirse a los cambios en los parametros de la ruta | Header
    this.route.params.subscribe(params => {
      const user = params['username'];
      if (user) {
        this.loadUser(user)
        this.loadReviews(user)
        if(this.currentUsername === user){
          this.isMyProfile = true;
        }
        this.isAdmin = (this.auth.getUserRole() === 'ADMIN')
      }
    })
  }

  // ! ====== Metodo para cargar los datos del Usuario ======
  // ? ----- Cargar Usuario -----
  loadUser(username: string){
    this.uService.getUserProfile(username).subscribe({
      next: (data) => {this.selectedUser = data},
      error: (e) => console.error(e)
    })
  }

  // ? ----- Cargar sus Reviews -----
  loadReviews(username: string){
    this.rService.getReviewsForUser(username).subscribe({
      next: (data) => {this.reviews = data},
      error: (e) => console.error(e)
    })
  }

  // ! -------- Metodo para borrar una Review --------
  onDeleteReview(reviewId: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.rService.deleteReview(reviewId).subscribe({
        next: () => {
          alert('Review deleted successfully.')
          this.loadReviews(this.selectedUser!.username);
        },
        error: (e) => {
          console.error(e)
          alert('Error deleting review.')
        }
      })
    }
  }

  // ! ====== Metodos para los modales ======
  openReviewModal(){
    this.isModalOpen.set(true)
  }

  closeReviewModal(){
    this.isModalOpen.set(false)
  }
  
  // ? ----- Para reiniciar la pagina cuando se agregue o edite -----
  refreshReviews() {
    this.loadReviews(this.selectedUser!.username);
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