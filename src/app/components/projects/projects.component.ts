import { Component, OnInit } from '@angular/core';
import { Project } from '../../classes/project';
import { User } from '../../classes/user';
import { Team } from '../../classes/team';
import { Company } from '../../classes/company';
import { ProjectsService } from '../../services/projects.service';
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
    private projectsService: ProjectsService,
    private teamService: TeamService) { }

  // private company = new Company(0, 'Law Firm');
  private user = new User(0, 'ying@staffordesq.com', 'Ying', 'Stafford', 'Ying Stafford');
  // private project = new Project(0, 'Some project');
  // private team = new Team(0, 'Some team');

  ngOnInit() {
    this.getProjects();
    this.getTeams();
  }

  getProjects(): void {
    this.projectsService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getTeams(): void {
    this.teamService.getTeams()
      .subscribe(teams => this.teams = teams);
  }


}
