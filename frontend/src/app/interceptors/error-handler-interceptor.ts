import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification-service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService)

  return next(req).pipe(
    catchError((error) => {
    
      let userMessage = 'An unexpected error has occurred. Please try again later.'

      if(error.error && typeof error.error.message === 'string'){
        userMessage = error.error.message
      }
      else if (error.status === 0) {
        userMessage = 'Unable to connect to the server. Please check your connection.'
      } 
      else if (error.status === 404) {
        userMessage = 'The requested resource was not found (404).'
      } 
      else if (error.status === 401) {
          userMessage = 'You are not authorized (401).'
      }
      notificationService.showError(userMessage)

      return throwError(() => new Error(userMessage))
    })
  )
};

