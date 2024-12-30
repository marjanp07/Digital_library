import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  dashboard() {
    this.loginService.verifyLogin(this.username, this.password).subscribe(
      (response) => {
        console.log('Response from server:', response);
        if (response.success) {
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Error:', error);
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('An error occurred while logging in.');
        }
      }
    );
  }
}
