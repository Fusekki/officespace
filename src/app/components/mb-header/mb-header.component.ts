import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Project } from '../../classes/project';
import { CompanyService } from '../../services/company.service';


// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mb-header',
  templateUrl: './mb-header.component.html',
  styleUrls: ['./mb-header.component.css']
})
export class MbHeaderComponent implements OnInit {

  project: Project;
  currentUser: User;


    constructor(private companyService: CompanyService,
      private route: ActivatedRoute,
      private userService: UserService) { }

      ngOnInit() {
        this.getProject();
      }

      getProject(): void {
        const co = +this.route.snapshot.paramMap.get('co');
        this.companyService.getCompany(co)
          .subscribe(project => this.project = project);
      }

}
