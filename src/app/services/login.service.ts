import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  BookID: number;
  BookName: string;
  AuthorName: string;
  Price: number;
}


@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  verifyLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }
  registerUser(email: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, username, password });
  }
  addBook(bookName: string, authorName: string, price: number): Observable<any> {
    const body = { bookName, authorName, price };
    return this.http.post(`${this.apiUrl}/books`, body);
  }
  getBooks(): Observable<{ success: boolean; data: Book[] }> {
    return this.http.get<{ success: boolean; data: Book[] }>(`${this.apiUrl}/books`);
  }
  deleteBook(bookID: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${bookID}`);
  }
}
