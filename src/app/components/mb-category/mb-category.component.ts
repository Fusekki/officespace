import { Component, OnInit } from '@angular/core';

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
  selector: 'app-mb-category',
  templateUrl: './mb-category.component.html',
  styleUrls: ['./mb-category.component.css']
})
export class MbCategoryComponent implements OnInit {
  selected: string;
  company: Company;
  currentUser: User;
  messageboard: MessageBoard;
  mbposts: MbPost[];
  users: User[];
  selectedData: MbPost[];
  mbCategories: MbCategory[];

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private mbcategoryService: MbCategoryService) { }


  ngOnInit() {
    this.getUsers();
    this.userService.getCurrentUser().subscribe(currentUser => this.currentUser = currentUser);
    this.getMbcategories();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


  getMbcategories(): void {
    this.mbcategoryService.getMbCategories()
      .subscribe(mbCategories => this.mbCategories = mbCategories);
  }


  goBack(): void {
    this.location.back();
  }

}
