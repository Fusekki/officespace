import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { MessageService } from '../../services/message.service';
import { Wcmessage } from '../../classes/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  private wcmessage: Wcmessage;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  getMessage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageService.getMessage(id)
      .subscribe(wcmessage => this.wcmessage = wcmessage);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.messageService.updateMessage(this.wcmessage)
      .subscribe(() => this.goBack());
  }

}
