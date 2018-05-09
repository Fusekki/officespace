import { Component, OnInit } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { map } from 'rxjs/operators';

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
  selector: 'app-mb-drafts',
  templateUrl: './mb-drafts.component.html',
  styleUrls: ['./mb-drafts.component.css']
})
export class MbDraftsComponent implements OnInit {
  selected: string;
  project: Project;
  user: User;
  messageboard: MessageBoard;
  mbposts: MbPost[] = [];
  users: User[] = [];
  draftPosts: MbPost[] = [];

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private messageboardService: MessageBoardService,
    private mbpostService: MbPostService) { }

  ngOnInit() {
    this.getUsers();
    this.getUser();
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
      .pipe(map(mbposts => this.mbposts = mbposts));
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }


  getauthorName(id: number): string {
    return this.users.find(user => user.id == id).fullName;
  }

}
