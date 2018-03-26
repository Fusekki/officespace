export class MbPost {
  id: number;
  messageboardId: number;
  draft: boolean;
  author: number;
  created: any;
  title: string;
  category: number;
  content: string;

  constructor(id: number, m_id: number, draft: boolean, author: number, created: any, title: string, category: number, content: string) {
    this.id = id;
    this.messageboardId = m_id;
    this.draft = draft;
    this.author = author;
    this.created = created;
    this.title = title,
    this.category = category,
    this.content = content;
  }
}
