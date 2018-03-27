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
  selector: 'app-mb-message-draft',
  templateUrl: './mb-message-draft.component.html',
  styleUrls: ['./mb-message-draft.component.css']
})
export class MbMessageDraftComponent implements OnInit {

  selectedCategory: number;
  project: Project;
  user: User;
  messageboard: MessageBoard;
  mbposts: MbPost[] = [];
  draft: MbPost;
  users: User[] = [];
  date: Date;
  category: number;
  authorName: string;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private messageboardService: MessageBoardService,
              private mbpostService: MbPostService) { }

  ngOnInit() {
    this.getProject();
    this.getMessageboard();
    this.getMbPost();
    this.getMbposts();
    this.getUsers();
    this.getUser();
    this.getUsers().subscribe(_ => {
      ;
      this.authorName = this.users.find(user => user.id == this.draft.author).fullName;
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


  getUsers() {
    return this.userService.getUsers()
      .map(users => this.users = users);
  }

  // getauthorName(id: number): string {
  //   return this.users.find(user => user.id == id).fullName;
  // }


  goBack(): void {
    this.location.back();
  }

  addMbPost(title: string, content: string, draft: boolean): void {
    content = content.trim();
    if (!content) { return; }
    const id = +this.route.snapshot.paramMap.get('id');
    this.date = new Date(Date.now());
    this.category = this.selectedCategory;
    this.mbpostService.addMbPost({
      messageboardId: 0,
      draft: draft,
      author: this.user.id,
      created: this.date,
      title: title,
      category: this.category,
      content: content
    } as MbPost)
      .subscribe(mbpost => {
        this.mbposts.push(mbpost)
      });
  }



  getMbPost(): void {
    const dr = +this.route.snapshot.paramMap.get('dr');
    this.mbpostService.getMbPost(dr)
      .subscribe(draft => this.draft = draft);
  }

  getMbposts(): void {
    this.mbpostService.getMbPosts()
      .subscribe(mbposts => this.mbposts = mbposts);
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
