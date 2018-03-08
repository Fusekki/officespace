import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import { MessageService } from '../../services/message.service';
import { Message } from '../../classes/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  private message: Message;
  // @Input() message: Message;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.getMessage();
  }

  getMessage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageService.getMessage(id)
      .subscribe(message => this.message = message);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.messageService.updateMessage(this.message)
      .subscribe(() => this.goBack());
  }

}
