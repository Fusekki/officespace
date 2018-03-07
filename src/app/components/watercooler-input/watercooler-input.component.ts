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

  // private id: number;
  private messageText: string;
  // private messageDate: string;
  // private author: string;
  // private watercooler_id: number;
  // private showMessageinput: boolean;
  serializedDate = new FormControl((new Date()).toISOString());

  watercooler: Watercooler;
  messages: Message[] = [];


  constructor( private messageService: MessageService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {}

  addMessage(): void {
    this.messageService.addMessage(this.message)
      .subscribe(() => this.goBack());
  }

  private cancelMessage(): void {
    this.messageText = '';
  }

  goBack(): void {
    this.location.back();
  }


}
