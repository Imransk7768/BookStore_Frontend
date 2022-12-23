import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  fullName: any='';
  ngOnInit(): void {
    this.fullName = localStorage.getItem('name');
  }
  logOut(){
    localStorage.removeItem('token');
  }

}
