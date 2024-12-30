import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, CommonModule, GoogleChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})


export class DashboardComponent {

  constructor(private router: Router) { }



  chartTitleBar = 'No. of Books';
  chartTypeBar = ChartType.BarChart;
  chartDataBar = [
    ['Person 1', 5],
    ['Person 2', 8],
    ['Person 3', 12],
    ['Person 4', 7],
    ['Person 5', 4]
  ];
  chartOptionsBar = {
    width: 400,
    height: 300,
    colors: ['#4472C4'],
    titleTextStyle: { color: '#2F5597', fontSize: 18 },
    legend: { position: 'none' }
  };

  chartTitlePie = 'No. of Books';
  chartTypePie = ChartType.PieChart;
  chartDataPie = [
    ['Person 1', 11],
    ['Person 2', 14],
    ['Person 3', 33],
    ['Person 4', 20],
    ['Person 5', 22]
  ];
  chartOptionsPie = {
    width: 400,
    height: 300,
    is3D: true,
    colors: ['#4472C4', '#2F5597', '#A5A5A5', '#FFC000', '#00B0F0'],
    titleTextStyle: { color: '#2F5597', fontSize: 18 }
  };

  AddBook() {
    this.router.navigate(['/add-book']);
  }

  ViewBook() {
    this.router.navigate(['/view-books']);
  }

  Logout() {

    this.router.navigate(['/login']);

  }

}
