import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {

  constructor() { }

  reports: string[] = [];

  add(report: string) {
    this.reports.push(report);
  }

  clear() {
    this.reports = [];
  }
}
