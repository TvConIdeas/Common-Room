import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-toast',
  imports: [AsyncPipe],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.css'
})
export class ErrorToast {
  errorMessage$: Observable<string | null>

  constructor(private notificationService: NotificationService){
    this.errorMessage$ = this.notificationService.errorMessage$
  }

  onClose(): void{
    this.notificationService.hideError()
  }
}