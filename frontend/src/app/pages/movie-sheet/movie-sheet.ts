import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MovieDetails } from '../../models/MovieDetails';

@Component({
  selector: 'app-movie-sheet',
  imports: [],
  templateUrl: './movie-sheet.html',
  styleUrl: './movie-sheet.css'
})

export class MovieSheet implements OnInit{
  
  chosenMovie: MovieDetails | undefined

  constructor(private route: ActivatedRoute,
    public mService: MovieService,
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id']
    this.loadMovie(movieId)
  }

  loadMovie(id: number){
    this.mService.getMovieById(id).subscribe({
      next: (data) => { this.chosenMovie = data },
      error: (e) => { console.log(e) }
    })
  }
}
