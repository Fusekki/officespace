
import { Component, OnInit } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
  selector: 'app-mb-messages',
  templateUrl: './mb-messages.component.html',
  styleUrls: ['./mb-messages.component.css']
})
export class MbMessagesComponent implements OnInit {
  selected: string;
  project: Project;
  user: User;
  messageboard: MessageBoard;
  mbposts: MbPost[];
  users: User[];
  selectedData: MbPost[];
  draftPosts: MbPost[];


  constructor(private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private messageboardService: MessageBoardService,
    private mbpostService: MbPostService) { }

  ngOnInit() {
    this.getProject();
    this.getMessageboard();
    // this.getMbposts();
    this.getUsers();
    this.getUser();

    this.getMbposts().subscribe(_ => {
      ;
      this.selectedData = this.mbposts.filter(mbpost => mbpost.draft != true);
      this.draftPosts = this.mbposts.filter(mbpost => mbpost.draft == true);
    });
  }

  // Temporary. This route has the id for the messageboard.
  getMessageboard(): void {
    const mb = +this.route.snapshot.paramMap.get('mb');
    this.messageboardService.getMessageBoard(mb)
      .subscribe(messageboard => this.messageboard = messageboard);
  }

  getProject(): void {
    const pr = +this.route.snapshot.paramMap.get('pr');
    this.projectService.getProject(pr)
      .subscribe(project => this.project = project);
  }


  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getauthorName(id: number): string {
    return this.users.find(user => user.id == id).fullName;
  }

  goBack(): void {
    this.location.back();
  }


  getMbposts() {
    return this.mbpostService.getMbPosts()
      .map(mbposts => this.mbposts = mbposts);
  }

  onSelect(id: number) {
    if (id == -1) {
      this.selectedData = this.mbposts.filter(mbpost => mbpost.draft != true);
    } else {
      this.selectedData = this.mbposts.filter(mbpost => mbpost.category == id && mbpost.draft != true);
    }
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }


}
