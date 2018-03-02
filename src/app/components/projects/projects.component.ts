import { Component, OnInit } from '@angular/core';
import { Project } from '../../classes/project';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectsService.getProjects()
      .subscribe(projects => this.projects = projects);
  }


}
