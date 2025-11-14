import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/Review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private URL = 'http://localhost:8080'

  constructor(private http: HttpClient){}

  //POST reviews
  createReview(review: Review):  Observable<Review>{
    return this.http.post<Review>(`${this.URL}/reviews`, review)
  }
  
  //PUT review
  updateReview(reviewId: string, review: Review): Observable<Review>{
    return this.http.put<Review>(`${this.URL}/reviews/${reviewId}`, review)
  }
  
  //DELETE review
  deleteReview(reviewId: string): Observable<void>{
    return this.http.delete<void>(`${this.URL}/review/${reviewId}`)
  }
  
  //GET reviews por película
  getReviewsForMovie(movieId: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.URL}/movies/${movieId}/reviews`)
  }

  //GET reviews por usuario
  gerReviewsForUser(userId: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.URL}/users/${userId}/reviews`)
  }

}
