import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Legalcase } from '../../classes/legalcase';
import { LegalcaseService } from '../../services/legalcase.service';

@Component({
  selector: 'app-legalcase-detail',
  templateUrl: './legalcase-detail.component.html',
  styleUrls: ['./legalcase-detail.component.css']
})
export class LegalcaseDetailComponent implements OnInit {
  @Input() legalcase: Legalcase;

  constructor(
    private route: ActivatedRoute,
    private legalcaseService: LegalcaseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLegalcase();
  }

  getLegalcase(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.legalcaseService.getLegalcase(id)
      .subscribe(legalcase => this.legalcase = legalcase);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.legalcaseService.updateLegalcase(this.legalcase)
      .subscribe(() => this.goBack());
  }

}
