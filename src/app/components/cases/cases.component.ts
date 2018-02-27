import { Component, OnInit } from '@angular/core';
import { Case } from '../../classes/case';
import { CaseService} from '../../services/case.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  cases: Case[];

  constructor(private caseService: CaseService) { }

  ngOnInit() {
    this.getCases();
  }

  getCases(): void {
    this.caseService.getCases()
      .subscribe(cases => this.cases = cases);
  }

  add(title: string): void {
    title = name.trim();
    if (!name) { return; }
    this.caseService.addCase({ title } as Case)
      .subscribe(case => {
        this.cases.push(case);
      });
  }

  delete(case: Case): void {
    this.cases = this.cases.filter(c => c !== case);
    this.caseService.deleteCase(case).subscribe();
  }

}
