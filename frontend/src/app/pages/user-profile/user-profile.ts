import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit{
  selectedUser: User | null = null
  isMyProfile = false

  constructor(private route: ActivatedRoute, public uService: UserService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const username = params.get('username')

        if(!username){
          throw new Error('User not found.')
        }

        this.isMyProfile = (username === 'me')

        if(this.isMyProfile){
          return this.uService.getMyProfile()
        }
        else{
          return this.uService.getUserProfile(username)
        }
      })
    ).subscribe({
      next: (data) => {this.selectedUser = data},
      error: (e) => {console.error(e)}
    })
  }
}
