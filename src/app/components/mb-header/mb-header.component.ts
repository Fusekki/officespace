import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Company } from '../../classes/company';
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

  company: Company;
  currentUser: User;


    constructor(private companyService: CompanyService,
      private route: ActivatedRoute,
      private userService: UserService) { }

      ngOnInit() {
        this.getCompany();
      }

      getCompany(): void {
        const co = +this.route.snapshot.paramMap.get('co');
        this.companyService.getCompany(co)
          .subscribe(company => this.company = company);
      }

}
