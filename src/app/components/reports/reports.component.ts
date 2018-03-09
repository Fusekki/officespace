import { Component, OnInit } from '@angular/core';

import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    reports: string[] = [];

    constructor(private reportService: ReportService) { }

    ngOnInit() {
      this.getReports();
    }

    getReports(): void {
      this.reports = this.reportService.getReports();
    }

    addReport(content: string): void {
      console.log('Adding to report ' + content);
      if (!content) { return; }
      this.reportService.add(content);
      this.getReports();
    }

}
