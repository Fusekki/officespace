import { Component, OnInit } from '@angular/core';
import { Legalcase } from '../../classes/legalcase';
import { LegalcaseService} from '../../services/legalcase.service';

@Component({
  selector: 'app-legalcases',
  templateUrl: './legalcases.component.html',
  styleUrls: ['./legalcases.component.css']
})
export class CasesComponent implements OnInit {
  legalcases: Legalcase[];

  constructor(private legalcaseService: LegalcaseService) { }

  ngOnInit() {
    this.getLegalcases();
  }

  getLegalcases(): void {
    this.legalcaseService.getLegalcases()
      .subscribe(legalcases => this.legalcases = legalcases);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.legalcaseService.addLegalcase({ title } as Legalcase)
      .subscribe(legalcase => {
        this.legalcases.push(legalcase);
      });
  }

  delete(legalcase: Legalcase): void {
    this.legalcases = this.legalcases.filter(l => l !== legalcase);
    this.legalcaseService.deleteLegalcase(legalcase).subscribe();
  }

}
