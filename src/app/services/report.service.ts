import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {Report} from '../classes/report';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReportService {

  private reportsUrl = 'api/reports';  // URL to web api


  constructor( private http: HttpClient ) { }

  // reports: string[] = [];

  // add(report: string) {
  //   this.reports.push(report);
  // }

  /** GET Reportes from the server */
  getReports (): Observable<Report[]> {
    return this.http.get<Report[]>(this.reportsUrl)
      .pipe(
        tap(Report => this.log(`fetched legal files`)),
        catchError(this.handleError('getReport', []))
      );
  }

  /** GET Report by id. Return `undefined` when id not found */
  getReportNo404<Data>(id: number): Observable<Report> {
    const url = `${this.reportsUrl}/?id=${id}`;
    return this.http.get<Report[]>(url)
      .pipe(
        map(Report => Report[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Report id=${id}`);
        }),
        catchError(this.handleError<Report>(`getReport id=${id}`))
      );
  }

  /** GET Report by id. Will 404 if id not found */
  getReport(id: number): Observable<Report> {
    const url = `${this.reportsUrl}/${id}`;
    return this.http.get<Report>(url).pipe(
      tap(_ => this.log(`fetched Report id=${id}`)),
      catchError(this.handleError<Report>(`getReport id=${id}`))
    );
  }

  /* GET Reportes whose name contains search term */
  searchReport(term: string): Observable<Report[]> {
    if (!term.trim()) {
      // if not search term, return empty Report array.
      return of([]);
    }
    return this.http.get<Report[]>(`api/Report/?title=${term}`).pipe(
      tap(_ => this.log(`found Report matching "${term}"`)),
      catchError(this.handleError<Report[]>('searchReport', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Report to the server */
  addReport (Report: Report): Observable<Report> {
    return this.http.post<Report>(this.reportsUrl, Report, httpOptions).pipe(
      tap((Report: Report) => this.log(`added Report w/ id=${Report.id}`)),
      catchError(this.handleError<Report>('addReport'))
    );
  }

  /** DELETE: delete the Report from the server */
  deleteReport (Report: Report | number): Observable<Report> {
    const id = typeof Report === 'number' ? Report : Report.id;
    const url = `${this.reportsUrl}/${id}`;

    return this.http.delete<Report>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Report id=${id}`)),
      catchError(this.handleError<Report>('deleteReport'))
    );
  }

  /** PUT: update the Report on the server */
  updateReport (Report: Report): Observable<any> {
    return this.http.put(this.reportsUrl, Report, httpOptions).pipe(
      tap(_ => this.log(`updated Report id=${Report.id}`)),
      catchError(this.handleError<any>('updateReport'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.report}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CompanyService report with the ReportService */
  private log(content: string) {
    console.log('Added report {content}');
    // this.reportService.addReport('CompanyService: ' + report);
    if (!content) { return; }
    this.addReport({ content } as Report)
      // .subscribe(legalcase => {
      //   this.legalcases.push(legalcase);
      // });
  }

  /** Log a ReportService report with the ReportService */
  // private log(report: string) {
  //   this.reportService.add('ReportService: ' + report);
  // }

  // clear() {
  //   this.reports = [];
  // }
}
