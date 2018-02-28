import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Legalcase } from '../../classes/legalcase';
import { LegalcaseService } from '../../services/legalcase.service';

@Component({
  selector: 'app-legalcase-item',
  templateUrl: './legalcase-item.component.html',
  styleUrls: ['./legalcase-item.component.css']
})
export class LegalCaseItemComponent implements OnInit {
  @Input() legalCase: Legalcase;

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
      .subscribe(legalCase => this.legalCase = legalCase);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.legalcaseService.updateLegalcase(this.legalCase)
      .subscribe(() => this.goBack());
  }

}
