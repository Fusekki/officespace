import { Component, OnInit } from '@angular/core';
import { Project } from '../../classes/project';
import { User } from '../../classes/user';
import { Team } from '../../classes/team';
import { Company } from '../../classes/company';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  teams: Team[] = [];

  constructor(private projectsService: ProjectsService) { }

  private company = new Company(0, 'Law Firm');
  private user = new User(0, 'ying@staffordesq.com', 'Ying Stafford');
  private project = new Project(0, 'Some project');
  private team = new Team(0, 'Some team');

  projects.push(project);
  teams.push(team);


  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectsService.getProjects()
      .subscribe(projects => this.projects = projects);
  }


}
