import { Component, OnInit } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox'

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
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  selected: string;
  project: Project;
  user: User;
  todos: ToDo[];
  users: User[];

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private todoService: ToDoService) { }

  ngOnInit() {
    this.getProject();
    this.getUsers();
    this.getUser();

    this.getTodos().subscribe(_ => {
      ;
    });
  }


  getProject(): void {
    const pr = +this.route.snapshot.paramMap.get('pr');
    this.projectService.getProject(pr)
      .subscribe(project => this.project = project);
  }


  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getauthorName(id: number): string {
    return this.users.find(user => user.id == id).fullName;
  }

  goBack(): void {
    this.location.back();
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
