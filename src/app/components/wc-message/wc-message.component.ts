import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { WcmessageService } from '../../services/wc-message.service';
import { Wcmessage } from '../../classes/wc-message';

@Component({
  selector: 'app-wcmessage',
  templateUrl: './wc-message.component.html',
  styleUrls: ['./wc-message.component.css']
})
export class WcmessageComponent implements OnInit {
  @Input()
  private wcmessage: Wcmessage;

  constructor(
    private route: ActivatedRoute,
    private wcmessageService: WcmessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  getMessage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.wcmessageService.getMessage(id)
      .subscribe(wcmessage => this.wcmessage = wcmessage);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.wcmessageService.updateMessage(this.wcmessage)
      .subscribe(() => this.goBack());
  }

}
