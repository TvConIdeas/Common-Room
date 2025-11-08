import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  searchQuery: string = ''

  constructor(private router: Router) {}

  onSearch() {
    //Comprobar que el campo no este vacio
    if(this.searchQuery.trim()) {
      this.router.navigate(['/search', this.searchQuery.trim()])
      this.searchQuery = ''
    }
  }
}
