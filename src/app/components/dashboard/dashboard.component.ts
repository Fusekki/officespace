import { Component, OnInit } from '@angular/core';
import { Legalcase } from '../../classes/legalcase';
import { LegalcaseService } from '../../services/legalcase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  legalcases: Legalcase[] = [];

  constructor(private legalcaseService: LegalcaseService) { }

  ngOnInit() {
    this.getLegalcases();
  }

  getLegalcases(): void {
    this.legalcaseService.getLegalcases()
      .subscribe(legalcases => this.legalcases = legalcases.slice(1, 5));
  }

}
