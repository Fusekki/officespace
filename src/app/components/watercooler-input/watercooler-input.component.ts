import { Component, Input, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


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
  @Input() message: Message;

  private messageText: string;

  // serializedDate = new FormControl((new Date()).toISOString());

  watercooler: Watercooler;
  messages: Message[] = [];
  date: Date;

  nextIndex = 0;

  constructor( private messageService: MessageService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {}

  addMessage(value: string): void {
    this.date = new Date(Date.now());
    console.log('Pressed enter');

    this.messageService.addMessage( new Message(
      this.nextIndex,
      "someone",
      this.date,
      "something",
      0
    ) );

    // this.messageText = '';
  }

  private cancelMessage(): void {
    this.messageText = '';
  }

  goBack(): void {
    this.location.back();
  }


}
