import { Component, OnInit } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MessageBoard } from '../../classes/message-board';
import { Company } from '../../classes/company';
import { CompanyService } from '../../services/company.service';
import { MessageBoardService } from '../../services/message-board.service';

import { MbPost } from '../../classes/mb-post';

// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {

  company: Company;
  currentUser: User;
  messageboard: MessageBoard;
  MbPosts = MbPost[] = [];

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private messageboardService: MessageBoardService) { }

  ngOnInit() {
    this.getCompany();
    this.getMessageboard();
    this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = currentUser);
  }

  // Temporary. This route has the id for the messageboard.
  getMessageboard(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageboardService.getMessageBoard(id)
      .subscribe(messageboard => this.messageboard = messageboard);
  }

  getCompany(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.companyService.getCompany(id)
      .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }


}
