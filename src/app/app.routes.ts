import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './registeration/registeration.component';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegisterComponent },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    },

    {
        path: 'add-book',
        loadComponent: () =>
            import('./add-book/add-book.component').then(m => m.AddBookComponent),
    },

    {
        path: 'view-books',
        loadComponent: () =>
            import('./view-books/view-books.component').then(m => m.ViewBookComponent),
    },

];

