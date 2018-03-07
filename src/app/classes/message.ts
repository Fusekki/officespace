export class Message {
  idx: number;
  text: string;
  date: string;
  author: string;

  constructor(idx: number, date: string, text: string, author: string) {
    this.idx = idx;
    this.date = date;
    this.text = text;
    this.author = author;

  }
}
