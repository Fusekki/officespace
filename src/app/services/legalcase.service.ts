import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Legalcase } from '../classes/legalcase';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LegalcaseService {

  private legalcasesUrl = 'api/legalcases';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET legalcasees from the server */
  getLegalcases (): Observable<Legalcase[]> {
    return this.http.get<Legalcase[]>(this.legalcasesUrl)
      .pipe(
        tap(legalcases => this.log(`fetched legal cases`)),
        catchError(this.handleError('getLegalcases', []))
      );
  }

  /** GET legalcase by id. Return `undefined` when id not found */
  getLegalcaseNo404<Data>(id: number): Observable<Legalcase> {
    const url = `${this.legalcasesUrl}/?id=${id}`;
    return this.http.get<Legalcase[]>(url)
      .pipe(
        map(legalcases => legalcases[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} legalcase id=${id}`);
        }),
        catchError(this.handleError<Legalcase>(`getLegalcase id=${id}`))
      );
  }

  /** GET legalcase by id. Will 404 if id not found */
  getLegalcase(id: number): Observable<Legalcase> {
    const url = `${this.legalcasesUrl}/${id}`;
    return this.http.get<Legalcase>(url).pipe(
      tap(_ => this.log(`fetched legalcase id=${id}`)),
      catchError(this.handleError<Legalcase>(`getLegalcase id=${id}`))
    );
  }

  /* GET legalcasees whose name contains search term */
  searchLegalcases(term: string): Observable<Legalcase[]> {
    if (!term.trim()) {
      // if not search term, return empty legalcase array.
      return of([]);
    }
    return this.http.get<Legalcase[]>(`api/legalcases/?title=${term}`).pipe(
      tap(_ => this.log(`found legalcases matching "${term}"`)),
      catchError(this.handleError<Legalcase[]>('searchLegalcases', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new legalcase to the server */
  addLegalcase (legalcase: Legalcase): Observable<Legalcase> {
    return this.http.post<Legalcase>(this.legalcasesUrl, legalcase, httpOptions).pipe(
      tap((legalcase: Legalcase) => this.log(`added legalcase w/ id=${legalcase.id}`)),
      catchError(this.handleError<Legalcase>('addLegalcase'))
    );
  }

  /** DELETE: delete the legalcase from the server */
  deleteLegalcase (legalcase: Legalcase | number): Observable<Legalcase> {
    const id = typeof legalcase === 'number' ? legalcase : legalcase.id;
    const url = `${this.legalcasesUrl}/${id}`;

    return this.http.delete<Legalcase>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted legalcase id=${id}`)),
      catchError(this.handleError<Legalcase>('deleteLegalcase'))
    );
  }

  /** PUT: update the legalcase on the server */
  updateLegalcase (legalcase: Legalcase): Observable<any> {
    return this.http.put(this.legalcasesUrl, legalcase, httpOptions).pipe(
      tap(_ => this.log(`updated legalcase id=${legalcase.id}`)),
      catchError(this.handleError<any>('updateLegalcase'))
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
    // this.reportService.addReport('CompanyService: ' + report);
    if (!content) { return; }
    this.reportService.addReport(content);
      // .subscribe(legalcase => {
      //   this.legalcases.push(legalcase);
      // });
  }

  // /** Log a LegalcaseService report with the ReportService */
  // private log(report: string) {
  //   this.reportService.addReport('LegalcaseService: ' + report);
  // }
}
