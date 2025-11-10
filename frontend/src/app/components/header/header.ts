import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{

  searchForm !: FormGroup

  constructor(private router : Router, private fb : FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required]
    })
  }

  onSearch() {
    //Comprobar que el campo no este vacio
    if(this.searchForm.valid) {
      this.router.navigate(['/movies/search', this.searchForm.value.searchQuery])
      console.log(this.searchForm.value.searchQuery)
      this.searchForm.reset()
    }
  }
}
