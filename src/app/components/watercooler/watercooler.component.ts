import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Watercooler } from '../../classes/watercooler';
import { WatercoolerService } from '../../services/watercooler.service';

@Component({
  selector: 'app-watercooler',
  templateUrl: './watercooler.component.html',
  styleUrls: ['./watercooler.component.css']
})
export class WatercoolerComponent implements OnInit {

  watercooler: Watercooler;

  constructor(private watercoolerService: WatercoolerService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getWatercooler();
  }

  getWatercooler(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.watercoolerService.getWatercooler(id)
      .subscribe(watercooler => this.watercooler = watercooler);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.watercoolerService.updateWatercooler(this.watercooler)
      .subscribe(() => this.goBack());
  }

}
