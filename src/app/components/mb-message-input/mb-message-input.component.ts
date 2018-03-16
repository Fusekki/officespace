import { Component, OnInit } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MessageBoard } from '../../classes/message-board';
import { Company } from '../../classes/company';
import { CompanyService } from '../../services/company.service';
import { MessageBoardService } from '../../services/message-board.service';

import { MbPost } from '../../classes/mb-post';
import { MbPostService } from '../../services/mb-post.service';
// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-mb-message-input',
  templateUrl: './mb-message-input.component.html',
  styleUrls: ['./mb-message-input.component.css']
})
export class MbMessageInputComponent implements OnInit {
  selectedCategory: string;
  company: Company;
  currentUser: User;
  messageboard: MessageBoard;
  mbposts: MbPost[];
  users: User[];

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private messageboardService: MessageBoardService,
              private mbpostService: MbPostService) { }

  ngOnInit() {
    this.getCompany();
    this.getMessageboard();
    this.getMbposts();
    this.getUsers();
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


  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


  goBack(): void {
    this.location.back();
  }

  addPost(content: string): void {
    // this.date = new Date(Date.now());
    // content = content.trim();
    // if (!content) { return; }
    // this.wcmessageService.addMessage({
    //   author: this.currentUser.fullName,
    //   created: this.date,
    //   content: content,
    //   watercooler_id: 0
    // } as Wcmessage)
    //   .subscribe(wcmessage => {
    //     this.wcmessages.push(wcmessage)
    //   });
  }


  getMbposts(): void {
    this.mbpostService.getMbPosts()
      .subscribe(mbposts => this.mbposts = mbposts);
  }


}
