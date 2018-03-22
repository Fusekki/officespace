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

  constructor() { }

  ngOnInit() {
  }

}
