export class Message {
  id: number;
  author: string;
  created: string;
  content: string;
  watercooler_id: number;


  constructor(id: number, author: string, created: string, text: string, watercooler_id: number) {
    this.id = id;
    this.author = author;
    this.created = created;
    this.content = text;
    this.watercooler_id = watercooler_id
  }


}
