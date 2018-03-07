import { Component, Input, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Message } from '../../classes/message';
import { MessageService } from '../../services/message.service';
import { Watercooler } from '../../classes/watercooler';
import { WatercoolerService } from '../../services/watercooler.service';

@Component({
  selector: 'app-watercooler-input',
  templateUrl: './watercooler-input.component.html',
  styleUrls: ['./watercooler-input.component.css']
})
export class WatercoolerInputComponent implements OnInit {
  @Input()

  private showMe: boolean;
  private messageText: string;
  private messageDate: string;
  private author: string;
  // private messageDate: string;
  private showMessageinput: boolean;
  serializedDate = new FormControl((new Date()).toISOString());

  watercooler: Watercooler;
  messages: Message[] = [];


  constructor(private watercoolerService: WatercoolerService,
              private messageService: MessageService) {
    this.messageText = '';
    this.messageDate = this.serializedDate.value;
    // this.showMessageinput = messageService.getShowinput();
    this.showMe = false;
  }

  ngOnInit() {
  }
  private addMessage(): void {
    // console.log('Adding TODO.');
    // console.log(this.messageDate);
    // console.log(typeof(this.messageDate));
    this.messageService.addMessage(this.messageDate, this.messageText, this.author);
    // Reset totoText after submission
    this.messageText = '';
  }

  private cancelMessage(): void {
    // console.log('Csncelling message');
    this.showMe = false;
    this.messageService.showInput();
    this.messageText = '';
  }


  getMessages(): void {
    this.messageService.getMessages()
      .subscribe(messages => this.messages = messages);
  }

}
