import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {

  reports: string[] = [];

  addReport(report: string) {
    this.reports.push(report);
  }

  clear() {
    this.reports = [];
  }

  getReports():string[] {
    return this.reports;
  }
}
