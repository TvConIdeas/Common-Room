import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  // * ---- Variables----
  searchForm !: FormGroup
  isLoggedIn : boolean = false;

  // * ====== Contructor | ngOnInit ======
  constructor(
    private router : Router, 
    private fb : FormBuilder,
    private auth : AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn()

    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required]
    })
  }

  // * -------- Metodo para la barra de busqueda -------- 
  onSearch() {
    if(this.searchForm.valid) {
      this.router.navigate(['/movies/search', this.searchForm.value.searchQuery])
      console.log(this.searchForm.value.searchQuery)
      this.searchForm.reset()
    }
  }


}
