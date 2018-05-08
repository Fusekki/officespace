import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    created = Date.now();

  createDb() {
    const legalcases = [
      { id: 0, title: 'People vs. Someone', docket:'12345', defendant:'Someone', cols: 2, rows: 1, color: 'lightblue' },
      { id: 1, title: 'People vs. OJ Simpson', docket:'23456', defendant:'O.J. Simpson', cols: 2, rows: 2, color: 'lightgreen' },
      { id: 2, title: 'People vs. Paul Manafort', docket:'34567', defendant:'Manafort, Paul', cols: 2, rows: 1, color: 'lightpink' }
    ];
    const legalfiles = [
      { id: 0, legalcase_id: 0, title: 'Document1', icon: 'word' },
      { id: 1, legalcase_id: 0, title: 'Document2', icon: 'word' },
      { id: 2, legalcase_id: 0, title: 'Spreadsheet1', icon: 'excel' }
    ];
    // const projects = [
    //   { id: 0,  title: 'Special Case' }
    // ];
    const projects = [
      { id: 0,  name: 'Law Firm', creator:"Jane Doe", created: this.created, watercooler_id: 0, messageboard_id: 0, todo_id: 0 }
    ];
    const teams = [
      {id: 0, title: 'Some team', members: ["Jane Doe"] }
    ];
    const users = [
      {id: 0, email: 'janedoe@gmail.com',
                      firstName: 'Jane', lastName: 'Doe', jobTitle: 'lawyer', fullName: 'Jane Doe', companies: [0] }
    ];
    const watercoolers = [
      {id: 0, company_name: "Law Firm", projectId: 0, messages: [0] }
    ];

    const wcmessages = [
      {id: 0, author: "Jane Doe", created: this.created, content: "Hello", watercooler_id: 0 }
    ];

    const messageboards = [
      {id: 0, company_id: 0, categories: ['Announcements', 'FYI', 'Hearbeat', 'Pitch', 'Question'] }
    ];


    const mbposts = [
      {id: 0, messageboardId: 0, draft: false, author: 0, created: this.created,
        title: 'Hello', category: 1, content: 'Just wanted to say hi!!', subscribers: [0] },
      {id: 1, messageboardId: 0, draft: false, author: 0, created: this.created,
         title: 'Test', category: 2, content: 'This is a test', subscribers: [0] },
      {id: 2, messageboardId: 0, draft: true, author: 0, created: this.created,
        title: 'Draft', category: 0, content: 'This is a draft', subscribers: [0] },
      {id: 3, messageboardId: 3, draft: true, author: 0, created: this.created,
        title: 'Hello', category: 0, content: 'I am saying hi.', subscribers: [0] },
      {id: 5, messageboardId: 2, draft: true, author: 0, created: this.created,
        title: 'Im tired', category: 0, content: 'Massvely drunk. Hope I am not posting this for real.', subscribers: [0] }
    ];


    const todos = [
      {id: 0, author: 0, created: this.created,
        title: 'Stuff I have to do', content: 'Write briefs', completed: false, subscribers: [0] }
    ];


    return {legalcases,
      legalfiles,
      // projects,
      projects,
      teams,
      users,
      watercoolers,
      wcmessages,
      messageboards,
      mbposts,
      todos
      };
  }
}
