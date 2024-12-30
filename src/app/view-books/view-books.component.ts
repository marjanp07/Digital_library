import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Book, LoginService } from '../services/login.service';
import { log } from 'node:console';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule],
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBookComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: LoginService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe(
      (response) => {
        if (response.success) {
          this.books = response.data;
        }
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }


  deleteBook(bookID: number) {
    const confirmed = confirm('Are you sure you want to delete this book?');
    if (!confirmed) return;

    this.bookService.deleteBook(bookID).subscribe(
      (response) => {
        if (response.success) {
          alert(response.message);
          this.fetchBooks();
        }
      },
      (error) => {
        console.error('Error deleting book:', error);
        alert('Failed to delete the book.');
      }
    );
  }
}
