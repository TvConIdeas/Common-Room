import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { MovieSheet } from './pages/movie-sheet/movie-sheet';
import { UserProfile } from './pages/user-profile/user-profile';
import { UsersList } from './pages/users-list/users-list';
import { MoviesList } from './pages/movies-list/movies-list';
import { SearchPage } from './pages/search-page/search-page';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'login', component: LoginPage},
    {path: 'movie-details/:id', component: MovieSheet},
    {path: 'user-details/:username', component: UserProfile},
    {path: 'users', component: UsersList},
    {path: 'movies-list', component: MoviesList},
    {path: 'movies-list/search/:query', component: SearchPage}

];

