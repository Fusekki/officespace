import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';

import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  user: User;
  project: Project;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.getProject();
    this.getUser();
  }

  getProject(): void {
    const co = +this.route.snapshot.paramMap.get('co');
    this.projectService.getProject(co)
      .subscribe(project => this.project = project);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }
}
