import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const legalcases = [
      { id: 0, title: 'People vs. Someone' },
      { id: 1, title: 'People vs. OJ Simpson' },
      { id: 2, title: 'People vs. DJ Trump' }
    ];
    return {legalcases};
  }
}
