export class Wcmessage {
  id: number;
  author: string;
  created: Date;
  content: string;
  watercooler_id: number;


  constructor(id: number, author: string, created: Date, text: string, watercooler_id: number) {
    this.id = id;
    this.author = author;
    this.created = created;
    this.content = text;
    this.watercooler_id = watercooler_id
  }


}
