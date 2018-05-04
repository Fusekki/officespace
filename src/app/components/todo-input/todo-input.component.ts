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
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Input() todo: ToDo;

  selectedCategory: number;
  project: Project;
  user: User;
  todos: ToDo[] = [];
  users: User[] = [];
  date: Date;
  category: number;


  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private todoService: ToDoService,
              private router: Router) { }

  ngOnInit() {
    this.getProject();
    this.getMessageboard();
    this.getMbposts();
    this.getUsers();
    this.getUser();
  }

  // Temporary. This route has the id for the messageboard.


  getProject(): void {
    const co = +this.route.snapshot.paramMap.get('co');
    this.projectService.getProject(co)
      .subscribe(project => this.project = project);
  }


  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


  goBack(): void {
    this.location.back();
  }

  addTodo(title: string, content: string, draft: boolean): void {
    content = content.trim();
    if (!content) { return; }
    const id = +this.route.snapshot.paramMap.get('id');
    this.date = new Date(Date.now());
    this.category = this.selectedCategory;
    this.todoService.addToDo({
      messageboardId: 0,
      draft: draft,
      author: this.user.id,
      created: this.date,
      title: title,
      category: this.category,
      content: content
    } as todo)
      .subscribe(todo => {
        this.todos.push(todo)
      });
  }



  getTodos(): void {
    this.todoService.getToDos()
      .subscribe(todos => this.todos = todos);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  setCategory(value: number): void {
    this.selectedCategory = value;
  }

}
