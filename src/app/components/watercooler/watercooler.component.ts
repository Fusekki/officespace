import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Company } from '../../classes/company';
import { Watercooler } from '../../classes/watercooler';
import { WatercoolerService } from '../../services/watercooler.service';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-watercooler',
  templateUrl: './watercooler.component.html',
  styleUrls: ['./watercooler.component.css']
})
export class WatercoolerComponent implements OnInit {

  watercooler: Watercooler;
  company: Company;

  constructor(private watercoolerService: WatercoolerService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    // this.getWatercooler();
    this.getWatercooler().subscribe(_ => {
      ;
      console.log(this.watercooler.company_id);
      var id = this.watercooler.company_id;
      this.companyService.getCompany(id)
        .subscribe(company => this.company = company);
    });
  }

  getWatercooler() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.watercoolerService.getWatercooler(id)
      .map(watercooler => this.watercooler = watercooler);
  }

  getCompany(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.companyService.getCompany(id)
      .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.watercoolerService.updateWatercooler(this.watercooler)
      .subscribe(() => this.goBack());
  }

}
