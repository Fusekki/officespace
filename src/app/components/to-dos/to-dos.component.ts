import { Component, OnInit } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';

import { ToDo } from '../../classes/to-do';
import { ToDoService } from '../../services/todo.service';

// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {

  selectedCategory: string;
  project: Project;
  user: User;
  users: User[];
  todos: ToDo[];

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.getProject();
    this.getUsers();
    this.getUser();
  }

  getTodos(): void {
    this.to.getTeams()
      .subscribe(teams => this.teams = teams);
  }
  
  


  getProject(): void {
    const pr = +this.route.snapshot.paramMap.get('pr');
    this.projectService.getProject(pr)
      .subscribe(project => this.project = project);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }



  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


  goBack(): void {
    this.location.back();
  }


}
