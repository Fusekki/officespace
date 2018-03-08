import { Component, OnInit } from '@angular/core';

import { Report } from '../../classes/report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


    reports: Report[] = [];

    constructor(private reportService: ReportService) { }

    ngOnInit() {
      this.getReports();
    }

    getReports(): void {
      this.reportService.getReports()
        .subscribe(reports => this.reports = reports);
    }

    addReport(content: String): void {
      if (!content) { return; }
      this.reportService.addReport({ content } as Report)
        .subscribe(report => {
          this.reports.push(report);
        });
    }

}
