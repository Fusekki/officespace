import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Company } from '../../classes/company';
import { Wcmessage } from '../../classes/wc-message';
import { WcmessageService } from '../../services/wc-message.service';

import { Watercooler } from '../../classes/watercooler';
import { WatercoolerService } from '../../services/watercooler.service';
import { CompanyService } from '../../services/company.service';
// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-watercooler',
  templateUrl: './watercooler.component.html',
  styleUrls: ['./watercooler.component.css']
})
export class WatercoolerComponent implements OnInit {
  @Input() wcmessage: Wcmessage;


  private messageText: string;

  wcmessages: Wcmessage[] = [];
  watercooler: Watercooler;
  company: Company;
  date: Date;
  currentUser: User;

  constructor(private watercoolerService: WatercoolerService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location,
    private wcmessageService: WcmessageService,
    private userService: UserService) { }



  ngOnInit() {
    this.getWatercooler().subscribe(_ => {
      ;
      var id = this.watercooler.company_id;
      this.companyService.getCompany(id)
        .subscribe(company => this.company = company);
    });
    this.getMessages();
    this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = currentUser);

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
    content = content.trim();
    if (!content) { return; }
    this.wcmessageService.addMessage({
      author: this.currentUser.fullName,
      created: this.date,
      content: content,
      watercooler_id: 0
    } as Wcmessage)
      .subscribe(wcmessage => {
        this.wcmessages.push(wcmessage)
      });
  }


  getMessages(): void {
    this.wcmessageService.getMessages()
      .subscribe(wcmessages => this.wcmessages = wcmessages);
  }
}
