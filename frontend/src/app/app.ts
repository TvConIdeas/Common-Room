import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Sidebar } from './components/sidebar/sidebar';
import { ErrorToast } from './components/error-toast/error-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Sidebar, ErrorToast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
