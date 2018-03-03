import { Component, OnInit } from '@angular/core';
import { Project } from '../../classes/project';
import { User } from '../../classes/user';
import { Team } from '../../classes/team';
import { Company } from '../../classes/company';
import { ProjectService } from '../../services/project.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  teams: Team[] = [];

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService) { }
    private user = [ {id: 0, email: 'ying@staffordesq.com',
                  firstName: 'Ying', lastName: 'Stafford', fullName: 'Ying Stafford'} ];

  ngOnInit() {
    this.getProjects();
    this.getTeams();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getTeams(): void {
    this.teamService.getTeams()
      .subscribe(teams => this.teams = teams);
  }


}
