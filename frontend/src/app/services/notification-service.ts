import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private errorMessage = new BehaviorSubject<string | null>(null)

  public errorMessage$: Observable<string | null> = this.errorMessage.asObservable()

  constructor() {}

  //Muestra un mensaje de error
  showError(message: string): void{
    this.errorMessage.next(message)
  }

  //Oculta el mensaje de error actual
  hideError(): void{
    this.errorMessage.next(null)
  }
}
