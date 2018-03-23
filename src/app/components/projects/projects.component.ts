import { Component, OnInit } from '@angular/core';
// import { Project } from '../../classes/project';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Team } from '../../classes/team';
import { Project } from '../../classes/project';
// import { ProjectService } from '../../services/project.service';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';

import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  // projects: Project[] = [];
  teams: Team[] = [];
  projects: Project[] = [];
  user: User;
  // user = { id: 0, email: 'ying@staffordesq.com',
  //                   firstName: 'Ying', lastName: 'Stafford', fullName: 'Ying Stafford', projects: [0] };

  constructor(
    // private projectService: ProjectService,
    private teamService: TeamService,
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getProjects();
    this.getTeams();
    this.getProjects();
    this.getUser();
  }

  // getProjects(): void {
  //   this.projectService.getProjects()
  //     .subscribe(projects => this.projects = projects);
  // }

  getTeams(): void {
    this.teamService.getTeams()
      .subscribe(teams => this.teams = teams);
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }


}
