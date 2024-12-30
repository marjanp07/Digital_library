import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  register() {
    this.loginService.registerUser(this.email, this.username, this.password).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        if (response.success) {
          alert(response.message);
          this.router.navigate(['/login']);
        }
      },
      ((error: any) => {
        console.error('Error:', error);
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('An error occurred while registering user.');
        }
      }
      ));
  }
}
