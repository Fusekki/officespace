import { Component,Input, OnInit } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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
  @Input() mbpost: MbPost;

  selectedCategory: string;
  company: Company;
  currentUser: User;
  messageboard: MessageBoard;
  mbposts: MbPost[] = [];
  users: User[] = [];
  date: Date;

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

  addMbPost(title: string, content: string): void {
    content = content.trim();
    if (!content) { return; }
    const id = +this.route.snapshot.paramMap.get('id');
    this.date = new Date(Date.now());
    this.category = this.messageboard.categories.indexOf(this.selectedCategory);
    this.mbpostService.addMbPost({
      // id: 100,
      messageboard_id: 0,
      author: this.currentUser.id,
      created: this.date,
      title: title,
      category: this.category,
      content: content
    } as MbPost)
      .subscribe(mbpost => {
        this.mbposts.push(mbpost)
      });
  }



  getMbposts(): void {
    this.mbpostService.getMbPosts()
      .subscribe(mbposts => this.mbposts = mbposts);
  }


}
