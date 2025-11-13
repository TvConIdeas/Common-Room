import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { MovieSheet } from './pages/movie-sheet/movie-sheet';
import { UserProfile } from './pages/user-profile/user-profile';
import { UsersList } from './pages/users-list/users-list';
import { MoviesList } from './pages/movies-list/movies-list';
import { SearchPage } from './pages/search-page/search-page';
import { guestGuard } from './guards/guest-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'login', component: LoginPage, canActivate: [guestGuard]},
    {path: 'register', component: RegisterPage, canActivate: [guestGuard]},
    {path: 'movies', component: MoviesList},
    {path: 'movies/:id', component: MovieSheet},
    {path: 'movies/search/:query', component: SearchPage},
    {path: 'users', component: UsersList},
    {path: 'users/:username', component: UserProfile},
    //Cualquier otra ruta redirige a home
    {path: '', redirectTo: '/', pathMatch: 'full'},
];

