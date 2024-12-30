import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookName: string = '';
  authorName: string = '';
  price!: number;

  constructor(
    private bookService: LoginService,
    private router: Router
  ) { }

  onSubmit() {
    this.bookService.addBook(this.bookName, this.authorName, this.price)
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert(response.message);
            this.bookName = '';
            this.authorName = '';
            this.price = 0;
          }
        },
        (error: any) => {
          console.error('Error adding book:', error);
          alert('Failed to add book');
        }
      );
  }
}
