import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Company } from '../../classes/company';
import { Message } from '../../classes/message';
import { MessageService } from '../../services/message.service';

import { Watercooler } from '../../classes/watercooler';
import { WatercoolerService } from '../../services/watercooler.service';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-watercooler',
  templateUrl: './watercooler.component.html',
  styleUrls: ['./watercooler.component.css']
})
export class WatercoolerComponent implements OnInit {
  @Input() message: Message;


  private messageText: string;

  messages: Message[] = [];
  watercooler: Watercooler;
  company: Company;
  date: Date;
  nextIndex = 0;


  constructor(private watercoolerService: WatercoolerService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getWatercooler().subscribe(_ => {
      ;
      console.log(this.watercooler.company_id);
      var id = this.watercooler.company_id;
      this.companyService.getCompany(id)
        .subscribe(company => this.company = company);
    });
    this.getMessages();
  }

  getWatercooler() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.watercoolerService.getWatercooler(id)
      .map(watercooler => this.watercooler = watercooler);
  }

  getCompany(): void {
    const id = +this.watercooler.company_id;
    this.companyService.getCompany(id)
      .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.watercoolerService.updateWatercooler(this.watercooler)
      .subscribe(() => this.goBack());
  }

  addMessage(content: string): void {
    this.date = new Date(Date.now());
    console.log(content);
    content = content.trim();
    if (!content) { return; }
    this.messageService.addMessage({
      author: "Jane",
      created: this.date,
      content: content,
      watercooler_id: 0
    } as Message)author: "Jane",
      created: this.date,
        content: content,
          watercooler_id: 0
  } as Message)
      .subscribe(message => {
  this.messages.push(message)
});
  }


getMessages(): void {
  this.messageService.getMessages()
    .subscribe(messages => this.messages = messages);
}
}
