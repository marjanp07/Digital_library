import { Component, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

interface Book {
  name: string;
  author: string;
  publication: string;
  quantity: number;
  price: number;
  branch: string;
}
@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss'
})



export class DeleteBookComponent {


}
