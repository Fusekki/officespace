import {Input} from '@angular/core';
import {Injectable} from '@angular/core';

import {Message} from '../classes/message';
import {User} from '../classes/user';

import {FormControl} from '@angular/forms';

@Injectable()
export class MessageService {

  messageDate = new FormControl(new Date());
  private messageArr: Message[];
  private nextIndex: number;
  private nextUserindex: number;
  private showMessage: boolean;

  constructor() {
    this.messageArr = [
  ];

    this.nextIndex = 1;
    this.nextUserindex = 1;
    this.showMessage = true;
  }

  public getMessages(): Message[] {
    return this.messageArr;
  }

  public addMessage(text: string, date: string, author: string): void {
    // Create a new message from the input
    const message = new Message(this.nextIndex, text, date, author);
    // Push the message to the array
    this.messageArr.push(message);
    // Hide the message input
    this.showMessage = false;
    // Increase the index
    this.nextIndex++;
  }

  public deleteMessage(idx: number): void {
    this.messageArr = this.messageArr.filter(function (item) {
      return item.idx !== idx;
    });
    console.log(this.messageArr);

  }

  public getShowinput(): boolean {
    return this.showMessage;
  }

  public showInput(): void {
    this.showMessage = !this.showMessage;
  }





}
