
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

import { MbCategory } from '../../classes/mb-category';
import { MbCategoryService } from '../../services/mb-category.service';


// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mb-messages',
  templateUrl: './mb-messages.component.html',
  styleUrls: ['./mb-messages.component.css']
})
export class MbMessagesComponent implements OnInit {
  selected: string;
  company: Company;
  currentUser: User;
  messageboard: MessageBoard;
  mbposts: MbPost[];
  users: User[];
  selectedData: MbPost[];
  mbcategories: MbCategory[];

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private messageboardService: MessageBoardService,
    private mbpostService: MbPostService,
    private mbcategoryService: MbCategoryService) { }

  ngOnInit() {
    this.getCompany();
    this.getMessageboard();
    // this.getMbposts();
    this.getUsers();
    this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = currentUser);

    this.getMbposts().subscribe(_ => {
      ;
      this.selectedData = this.mbposts;
    });
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

  getauthorName(id: number): string {
    return this.users[id].fullName;
  }

  getcategoryName(id: number): object {
    return this.messageboard.categories[id].name;
  }


  goBack(): void {
    this.location.back();
  }

  //
  //
  // getMbposts(): void {
  //   this.mbpostService.getMbPosts()
  //     .subscribe(mbposts => this.mbposts = mbposts);
  // }

  getMbposts() {
    return this.mbpostService.getMbPosts()
      .map(mbposts => this.mbposts = mbposts);
  }



  onSelect(id: number) {
    if (id == -1) {
      this.selectedData = this.mbposts;
    } else {
      this.selectedData = this.mbposts.filter(mbpost => mbpost.category == id);
    }
  }


}
