export class MbPost {
  id: number;
  messageboardId: number;
  draft: boolean;
  author: number;
  created: number;
  title: string;
  category: number;
  content: string;
  state: string;

  constructor(id: number,
    messageboardId: number,
    draft: boolean,
    author: number,
    created: number,
    title: string,
    category: number,
    content: string,
    state = 'inactive') {
      // this.id = id; this.messageboardId = messageboardId;
      // this.draft = draft; this.author = author; this.created = created;
      // this.title = title, this.category = category, this.content = content,
      // this.state = state;
  }

    toggleState() {
      console.log('toggleState.');
      this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}
