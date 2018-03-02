import { Component, OnInit } from '@angular/core';
import { Company } from '../../classes/company';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companiesService.getCompanies()
      .subscribe(companies => this.companies = companies);
  }

}
