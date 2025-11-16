import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from '../../models/User';
import { ReviewService } from '../../services/review-service';
import { Review } from '../../models/Review';
import { ReviewModal } from "../../components/review-modal/review-modal";

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

  constructor(private route: ActivatedRoute, 
    public uService: UserService,
    private rService: ReviewService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.params['username']
    this.loadUser(username)
    this.loadReviews(username)
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
