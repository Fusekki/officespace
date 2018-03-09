import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {

  reports: string[] = [];

  add(report: string) {
    this.reports.push(report);
  }

  clear() {
    this.reports = [];
  }

  getReports():string[] {
    return this.reports;
  }
}
