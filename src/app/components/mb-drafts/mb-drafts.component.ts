import { Component, OnInit } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

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
  selector: 'app-mb-drafts',
  templateUrl: './mb-drafts.component.html',
  styleUrls: ['./mb-drafts.component.css']
})
export class MbDraftsComponent implements OnInit {
  selected: string;
  company: Company;
  currentUser: User;
  messageboard: MessageBoard;
  mbposts: MbPost[];
  users: User[];
  draftPosts: MbPost[];

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private messageboardService: MessageBoardService,
    private mbpostService: MbPostService) { }

  ngOnInit() {
    this.getUsers();
    this.getCurrentUser();
    this.getMessageboard();
    this.getMbposts().subscribe(_ => {
      ;
      this.draftPosts = this.mbposts.filter(mbpost => mbpost.draft == true);
    });
  }

  getMessageboard(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageboardService.getMessageBoard(id)
      .subscribe(messageboard => this.messageboard = messageboard);
  }

  getMbposts() {
    return this.mbpostService.getMbPosts()
      .map(mbposts => this.mbposts = mbposts);
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


  getCurrentUser(): void {
    this.userService.getCurrentUser()
    .subscribe(currentUser => this.currentUser = currentUser);
  }

  getauthorName(id: number): string {
    return this.users.find(user => user.id == id).fullName;
  }

}
