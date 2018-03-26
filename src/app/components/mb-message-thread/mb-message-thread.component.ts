import { Component,Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MessageBoard } from '../../classes/message-board';
import { Project } from '../../classes/project';
import { ProjectService } from '../../services/project.service';
import { MessageBoardService } from '../../services/message-board.service';

import { MbPost } from '../../classes/mb-post';
import { MbPostService } from '../../services/mb-post.service';
// Keep until we move to a backend
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mb-message-thread',
  templateUrl: './mb-message-thread.component.html',
  styleUrls: ['./mb-message-thread.component.css']
})
export class MbMessageThreadComponent implements OnInit {

  // @Input() mbpost: MbPost;

  authorName: string;
  selectedCategory: number;
  project: Project;
  user: User;
  messageboard: MessageBoard;
  mbposts: MbPost[] = [];
  users: User[] = [];
  date: Date;
  category: number;
  mbpost: MbPost;
  authorName: string;


  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private messageboardService: MessageBoardService,
              private mbpostService: MbPostService,
              private router: Router) { }

  ngOnInit() {
    const ms = +this.route.snapshot.paramMap.get('ms');
    this.getMessageboard();
    this.getProject();
    this.getMbposts().subscribe( mbposts => {
      this.mbpost = this.mbposts.find(mbpost => mbpost.id == ms);
    });
    this.getUser();
    this.getUsers().subscribe(_ => {
      ;
      this.authorName = this.users.find(user => user.id == this.mbpost.author).fullName;
    });
  }

  // Temporary. This route has the id for the messageboard.
  getMessageboard(): void {
    const mb = +this.route.snapshot.paramMap.get('mb');
    this.messageboardService.getMessageBoard(mb)
      .subscribe(messageboard => this.messageboard = messageboard);
  }

  getProject(): void {
    const co = +this.route.snapshot.paramMap.get('co');
    this.projectService.getProject(co)
      .subscribe(project => this.project = project);
  }


  getUsers() {
    return this.userService.getUsers()
      .map(users => this.users = users);
  }


  goBack(): void {
    this.location.back();
  }


  postMessage(): void {
    console.log('Added.');
    this.mbpost.draft = false;
    console.log(this.mbpost);
    this.mbpostService.updateMbPost(this.mbpost)
      .subscribe(() => this.redirect());

  }

  redirect(): void {
    this.router.navigate(['./' + this.user.id + '/messages/' + this.mbpost.id]);
  }


  getMbpost(): void {
    const mb = +this.route.snapshot.paramMap.get('mb');
    this.mbpostService.getMbPost(mb)
      .subscribe(mbpost => this.mbpost = mbpost);
  }



  getMbposts() {
    return this.mbpostService.getMbPosts()
      .map(mbposts => this.mbposts = mbposts);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  setCategory(value: number): void {
    this.selectedCategory = value;
  }

}
