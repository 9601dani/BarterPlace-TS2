import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{
  public user_admin:User
  constructor() {
    this.user_admin = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {}

}
