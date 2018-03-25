import { Component,Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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
  animations: [
  trigger('flyInOut', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 0.1s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ])
],
  selector: 'app-mb-message-edit',
  templateUrl: './mb-message-edit.component.html',
  styleUrls: ['./mb-message-edit.component.css']
})
export class MbMessageEditComponent implements OnInit {

  @Input() mbpost: MbPost;

  authorName: string;
  selectedCategory: number;
  project: Project;
  user: User;
  messageboard: MessageBoard;
  mbposts: MbPost[] = [];
  currentPost: MbPost;
  users: User[] = [];
  date: Date;
  category: number;
  draft: MbPost;


  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private messageboardService: MessageBoardService,
              private mbpostService: MbPostService,
              private router: Router) { }

  ngOnInit() {
    const dr = +this.route.snapshot.paramMap.get('dr');
    this.getProject();
    this.getMessageboard();
    this.getMbposts().subscribe( mbposts => {
      this.draft = this.mbposts.find(mbpost => mbpost.id == dr);
    });
    // this.getMbpost();
    this.getUsers();
    this.getUser();

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

  addMbPost(title: string, content: string, draft: boolean): void {
    content = content.trim();
    if (!content) { return; }
    const id = +this.route.snapshot.paramMap.get('id');
    this.date = new Date(Date.now());
    this.category = this.selectedCategory;
    this.currentPost = new MbPost(0, 0, draft, this.user.id, this.date, title, this.category, content);
    this.mbpostService.addMbPost({
      messageboard_id: 0,
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
  getMbpost(): void {
    const mb = +this.route.snapshot.paramMap.get('mb');
    this.mbpostService.getMbPost(mb)
      .subscribe(mbpost => this.draft = mbpost);
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

  saveDraft(): void {
    console.log('Saved.');
    console.log(this.draft);
    this.mbpostService.updateMbPost(this.draft)
      .subscribe(() => this.goBack());
  }

}
