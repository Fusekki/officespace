import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const legalcases = [
      { id: 0, title: 'People vs. Someone', cols: 3, rows: 1, color: 'lightblue' },
      { id: 1, title: 'People vs. OJ Simpson', cols: 1, rows: 2, color: 'lightgreen' },
      { id: 2, title: 'People vs. DJ Trump', cols: 1, rows: 1, color: 'lightpink' }
    ];
    return {legalcases};
  }
}
