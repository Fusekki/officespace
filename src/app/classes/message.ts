export class Message {
  id: number;
  author: string;
  date: string;
  time: string;
  content: string;
  watercooler_id: number;


  constructor(id: number, author: string, date: string, time: string, text: string, watercooler_id: number) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.time = time;
    this.content = text;
    this.watercooler_id = watercooler_id
  }


}
