export class MbPost {
  id: number;
  messageboard_id: number;
  draft: boolean;
  author: number;
  created: Date;
  title: string;
  category: number;
  content: string;

  constructor(id: number, m_id: number, draft: boolean, author: number, created: Date, title: string, category: number, content: string) {
    this.id = id;
    this.messageboard_id = m_id;
    this.draft = draft;
    this.author = author;
    this.created = created;
    this.title = title,
    this.category = category,
    this.content = content;
  }
}
