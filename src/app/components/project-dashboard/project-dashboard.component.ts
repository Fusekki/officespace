import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Company } from '../../classes/company';
import { CompanyService } from '../../services/company.service';

import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  user: User;
  company: Company;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.getCompany();
    this.getUser();
  }

  getCompany(): void {
    const co = +this.route.snapshot.paramMap.get('co');
    this.companyService.getCompany(co)
      .subscribe(company => this.company = company);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }
}
