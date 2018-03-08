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

  serializedDate = new FormControl((new Date()).toISOString());

  watercooler: Watercooler;
  messages: Message[] = [];

  nextIndex = this.messages.lastIndexOf() + 1;
  console.log(nextIndex)

  constructor( private messageService: MessageService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {}

  addMessage(value: string): void {

    this.messageService.addMessage( new Message(
      nextIndex,
      "someone",
      Date.Now(),
      "something",
      0
    ) );
      // onEnter(value: string) { this.value = value; }
            // .subscribe(projects => this.projects = projects);
  }

  private cancelMessage(): void {
    this.messageText = '';
  }

  goBack(): void {
    this.location.back();
  }


}
