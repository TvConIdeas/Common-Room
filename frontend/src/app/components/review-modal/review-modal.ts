import { Component, input, OnInit, output } from '@angular/core';
import { MovieDetails } from '../../models/MovieDetails';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Review } from '../../models/Review';
import { ReviewService } from '../../services/review-service';

@Component({
  selector: 'app-review-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './review-modal.html',
  styleUrl: './review-modal.css',
})
export class ReviewModal implements OnInit {
  movie = input<MovieDetails>();
  review = input<Review>();
  close = output<void>();
  reviewForm!: FormGroup;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [
        '',
        [Validators.required, Validators.min(0.5), Validators.max(5), this.multipleOfHalf],
      ],
      comment: [null, [Validators.maxLength(700)]],
      movieId: this.movie()?.id
    });
  }

  multipleOfHalf(control: AbstractControl): ValidationErrors | null {
    const value = Number(control.value); //Convertir el valor recibido a número (por seguridad)
    // Si el nro no es múltiplo de 0.5, retornamos un objeto con la clave del error
    return value % 0.5 === 0 ? null : { notMultipleOfHalf: true };
  }

  onSubmit() {
    this.reviewService.createReview(this.reviewForm.value).subscribe({
      next: (data) => {
        console.log(this.reviewForm.value);
        alert('Review saved successfully!');
        this.closeModal();
      },
      error: (e) => console.error(e),
    });
  }

  closeModal() {
    this.close.emit();
  }
}
