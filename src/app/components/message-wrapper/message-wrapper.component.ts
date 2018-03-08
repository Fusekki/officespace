import { Component, OnInit } from '@angular/core';
import { Message } from '../../classes/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.css']
})
export class MessageWrapperComponent implements OnInit {

  messages: Message[];

  constructor(
    private messageService: MessageService ) { }

  ngOnInit() {
    this.getMessages();

  }

  getMessages(): void {
    this.messageService.getMessages()
      .subscribe(messages => this.messages = messages);
  }

}
