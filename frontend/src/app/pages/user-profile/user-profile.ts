import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
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
  selectedUser: User | null = null
  isMyProfile = false
  reviews: Review[] = []
  isModalOpen = signal(false)
  isLoggedIn = false

  constructor(private route: ActivatedRoute, 
    public uService: UserService,
    private rService: ReviewService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en los parametros de la ruta | Header
    this.route.params.subscribe(params => {
      const user = params['username'];
      
      if (user) {
        this.isLoggedIn = this.auth.isLoggedIn()
        this.loadUser(user)
        this.loadReviews(user)      
        this.isMyProfile = (user === this.selectedUser)
      }
    })
  }

  loadUser(username: string){
    this.uService.getUserProfile(username).subscribe({
      next: (data) => {this.selectedUser = data},
      error: (e) => console.error(e)
    })
  }

  loadReviews(username: string){
    this.rService.getReviewsForUser(username).subscribe({
      next: (data) => {this.reviews = data},
      error: (e) => console.error(e)
    })
  }

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

  openReviewModal(){
    this.isModalOpen.set(true)
  }

  closeReviewModal(){
    this.isModalOpen.set(false)
  }
}



// this.route.paramMap.pipe(
//       switchMap(params => {
//         const username = params.get('username')

//         if(!username){
//           throw new Error('User not found.')
//         }

//         this.isMyProfile = (username === 'me')

//         if(this.isMyProfile){
//           return this.uService.getMyProfile()
//         }
//         else{
//           return this.uService.getUserProfile(username)
//         }
//       })
//     ).subscribe({
//       next: (data) => {this.selectedUser = data},
//       error: (e) => {console.error(e)}
//     })
