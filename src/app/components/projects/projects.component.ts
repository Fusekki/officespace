import { Component, OnInit } from '@angular/core';
// import { Project } from '../../classes/project';
import { User } from '../../classes/user';
import { Team } from '../../classes/team';
import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';
import { TeamService } from '../../services/team.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  // projects: Project[] = [];
  teams: Team[] = [];
  projects: Project[] = [];
  user = { id: 0, email: 'ying@staffordesq.com',
                    firstName: 'Ying', lastName: 'Stafford', fullName: 'Ying Stafford', projects: [0] };

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private companyService: CompanyService ) { }

  ngOnInit() {
    // this.getProjects();
    this.getTeams();
    this.getProjects();
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
    this.companyService.getCompanies()
      .subscribe(projects => this.projects = projects);
  }


}
