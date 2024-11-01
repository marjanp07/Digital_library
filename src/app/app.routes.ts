import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { ViewBookComponent } from './view-book/view-book.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'DashBoard', component: DashboardComponent },
    { path: 'AddBook', component: AddBookComponent },
    { path: 'DeleteBook', component: DeleteBookComponent },
    { path: 'ViewBook', component: ViewBookComponent },


];

