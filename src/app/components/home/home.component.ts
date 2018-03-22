import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}
