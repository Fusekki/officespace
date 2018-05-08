import { Component,Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';

import { ToDo } from '../../classes/to-do';
import { ToDoService } from '../../services/todo.service';
// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

authorName: string;
project: Project;
user: User;
todos: ToDo[] = [];
users: User[] = [];
date: Date;
todo: ToDo;

constructor(private projectService: ProjectService,
            private route: ActivatedRoute,
            private location: Location,
            private userService: UserService,
            private todoService: ToDoService,
            private router: Router) { }

ngOnInit() {
  const to = +this.route.snapshot.paramMap.get('to');
  this.getProject();
  this.getTodos().subscribe( todos => {
    this.todo = this.todos.find(todo => todo.id == to);
  });
  this.getUser();
  this.getUsers().subscribe(_ => {
    ;
    // this.authorName = this.users.find(user => user.id == this.mbpost.author).fullName;
  });
}


getProject(): void {
  const co = +this.route.snapshot.paramMap.get('co');
  this.projectService.getProject(co)
    .subscribe(project => this.project = project);
}


getUsers() {
  return this.userService.getUsers()
    .map(users => this.users = users);
}


goBack(): void {
  this.location.back();
}


getTodo(): void {
  const to = +this.route.snapshot.paramMap.get('to');
  this.todoService.getToDo(to)
    .subscribe(todo => this.todo = todo);
}



getTodos() {
  return this.todoService.getToDos()
    .map(todos => this.todos = todos);
}

getUser(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.userService.getUser(id)
    .subscribe(user => this.user = user);
}

}