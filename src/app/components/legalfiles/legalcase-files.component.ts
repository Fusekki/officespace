import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legalcase-files',
  templateUrl: './legalcase-files.component.html',
  styleUrls: ['./legalcase-files.component.css']
})
export class LegalcaseFilesComponent implements OnInit {

    legalfiles: Legalfile[] = [];

    constructor(private legalcaseService: LegalcaseService) { }

    ngOnInit() {
      this.getLegalcases();
    }

    getLegalcases(): void {
      this.legalcaseService.getLegalcases()
        .subscribe(legalcases => this.legalcases = legalcases.slice(0, 4));
    }

}
