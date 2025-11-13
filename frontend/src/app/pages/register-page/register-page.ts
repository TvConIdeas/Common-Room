import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage implements OnInit{
  loginForm!: FormGroup

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameIn: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      passwordIn: ['', [Validators.required, Validators.minLength(8)]],
      emailIn: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      pictureIn: ['', Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,6}(:\d+)?(\/[^\s]*)?$/i)]
    })
  }

  onSubmit(){
    
  }
}
