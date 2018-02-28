import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const legalcases = [
      { id: 11, title: 'People vs. OJ Simpson' },
      { id: 12, title: 'People vs. DJ Trump' }
    ];
    return {legalcases};
  }
}
