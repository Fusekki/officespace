import { Component, OnInit } from '@angular/core';
import { Legalfile } from '../../classes/legalfile';
import { LegalfileService } from '../../services/legalfile.service';


@Component({
  selector: 'app-legalfiles',
  templateUrl: './legalfiles.component.html',
  styleUrls: ['./legalfiles.component.css']
})
export class LegalfilesComponent implements OnInit {

    legalfiles: Legalfile[] = [];

    constructor(private legalfileService: LegalfileService) { }

    ngOnInit() {
      this.getLegalfiles();
    }

    getLegalfiles(): void {
      this.legalfileService.getLegalfiles()
        .subscribe(legalfiles => this.legalfiles = legalfiles);
    }

}
