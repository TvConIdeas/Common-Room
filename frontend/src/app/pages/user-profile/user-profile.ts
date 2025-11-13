import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from '../../models/User';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ChangePassword from '../../models/ChangePassword';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit{
  selectedUser: User | null = null
  isMyProfile = false

  showModal = false
  editProfileForm!: FormGroup

  showPasswordModal = false
  showDeleteModal = false
  passwordForm!: FormGroup

  passwordError: string | null = null
  passwordSuccess: string | null = null

  deleteError: string | null = null

  constructor(
    private route: ActivatedRoute, 
    public uService: UserService, 
    private fb: FormBuilder, 
    private router: Router, 
    private auth: AuthService) {}

  ngOnInit(): void {

    this.editProfileForm = this.fb.group({
      username:['',  [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email:['', [Validators.required, Validators.maxLength(50), Validators.email]],
      profilePictureUrl:[''],
      description: ['', Validators.maxLength(255)]
    })

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    })

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
      next: (data) => {this.selectedUser = data
        this.editProfileForm.patchValue({
          username: data.username,
          email: data.email,
          profilePictureUrl: data.profilePictureUrl,
          description: data.description
        })
      },
      error: (e) => {console.error(e)}
    })
  }

  //Métodos para el modal
  openModal(){
    this.editProfileForm.patchValue({
       username: this.selectedUser?.username,
       email: this.selectedUser?.email,
       profilePictureUrl: this.selectedUser?.profilePictureUrl,
      description: this.selectedUser?.description
    })
    this.showModal = true
  }

  closeModal(){
    this.showModal = false
  }

  onProfileSubmit(){
    if (this.editProfileForm.invalid || !this.selectedUser) {
      return
    }

    const dto: User = this.editProfileForm.value
    const currentUsername = this.selectedUser.username

    this.uService.updateUser(currentUsername, dto).subscribe({
      next: (data) => {
        if(data){
          //El perfil se actualizó y se devolvió un nuevo token
          console.log('Profile updated. New token received:')
        }
        //Actualizamos el usuario local para que se vea el cambio sin recargar
        this.selectedUser = {...this.selectedUser!, ...dto}
        console.log('Profile updated successfully.')
        this,this.closeModal()
      },
      error: (e) => {console.error('Error updating profile:', e)}
    })
  }

  //Modal change password
  openPasswordModal(){
    this.showModal = false
    this.showPasswordModal = true
    this.passwordError = null
    this.passwordSuccess = null
  }

  closePasswordModal(){
    this.showPasswordModal = false
    this.passwordForm.reset()
  }

  onPasswordSubmit(){
    if(this.passwordForm.invalid || !this.selectedUser){
      return
    }

    const formVaules = this.passwordForm.value
    if(formVaules.newPassword !== formVaules.confirmPassword){
      this.passwordError = "New password and confirmation do not match."
      return
    }

    const dto: ChangePassword = formVaules
    const username = this.selectedUser.username

    this.uService.changePassword(username, dto).subscribe({
      next: () => {
        this.passwordSuccess = "Password changed successfully."
        this.passwordError = null
        this.passwordForm.reset()

        setTimeout(() => this.closePasswordModal(), 2000)
      },
      error: (e) => {
        console.error(e)
        this.passwordError = e.error.message || "Error changing password. Please check your old password and try again."
        this.passwordSuccess = null
      }
    })
  }

  //Modal de eliminar perfil
  openDeleteModal(){
    this.showModal = false
    this.showDeleteModal = true
    this.deleteError = null
  }

  closeDeleteModal(){
    this.showDeleteModal = false
  }

  onDeleteConfirm(){
    if(!this.selectedUser){
      return
    }

    const username = this.selectedUser.username

    this.uService.deleteUser(username).subscribe({
      next: () => {
        alert('Profile deleted successfully.')
        this.router.navigate(['/'])
      },
      error: (e) => {
        console.error(e)
        this.deleteError = "Error deleting profile. Please try again later."
      }
    })
  }
}
