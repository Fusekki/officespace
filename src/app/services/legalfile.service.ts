import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Legalfile } from '../classes/legalfile';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LegalfileService {

  private legalfilesUrl = 'api/legalfiles';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET legalfilees from the server */
  getLegalfiles (): Observable<Legalfile[]> {
    return this.http.get<Legalfile[]>(this.legalfilesUrl)
      .pipe(
        tap(legalfiles => this.log(`fetched legal files`)),
        catchError(this.handleError('getLegalfiles', []))
      );
  }

  /** GET legalfile by id. Return `undefined` when id not found */
  getLegalfileNo404<Data>(id: number): Observable<Legalfile> {
    const url = `${this.legalfilesUrl}/?id=${id}`;
    return this.http.get<Legalfile[]>(url)
      .pipe(
        map(legalfiles => legalfiles[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} legalfile id=${id}`);
        }),
        catchError(this.handleError<Legalfile>(`getLegalfile id=${id}`))
      );
  }

  /** GET legalfile by id. Will 404 if id not found */
  getLegalfile(id: number): Observable<Legalfile> {
    const url = `${this.legalfilesUrl}/${id}`;
    return this.http.get<Legalfile>(url).pipe(
      tap(_ => this.log(`fetched legalfile id=${id}`)),
      catchError(this.handleError<Legalfile>(`getLegalfile id=${id}`))
    );
  }

  /* GET legalfilees whose name contains search term */
  searchLegalfiles(term: string): Observable<Legalfile[]> {
    if (!term.trim()) {
      // if not search term, return empty legalfile array.
      return of([]);
    }
    return this.http.get<Legalfile[]>(`api/legalfiles/?title=${term}`).pipe(
      tap(_ => this.log(`found legalfiles matching "${term}"`)),
      catchError(this.handleError<Legalfile[]>('searchLegalfiles', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new legalfile to the server */
  addLegalfile (legalfile: Legalfile): Observable<Legalfile> {
    return this.http.post<Legalfile>(this.legalfilesUrl, legalfile, httpOptions).pipe(
      tap((legalfile: Legalfile) => this.log(`added legalfile w/ id=${legalfile.id}`)),
      catchError(this.handleError<Legalfile>('addLegalfile'))
    );
  }

  /** DELETE: delete the legalfile from the server */
  deleteLegalfile (legalfile: Legalfile | number): Observable<Legalfile> {
    const id = typeof legalfile === 'number' ? legalfile : legalfile.id;
    const url = `${this.legalfilesUrl}/${id}`;

    return this.http.delete<Legalfile>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted legalfile id=${id}`)),
      catchError(this.handleError<Legalfile>('deleteLegalfile'))
    );
  }

  /** PUT: update the legalfile on the server */
  updateLegalfile (legalfile: Legalfile): Observable<any> {
    return this.http.put(this.legalfilesUrl, legalfile, httpOptions).pipe(
      tap(_ => this.log(`updated legalfile id=${legalfile.id}`)),
      catchError(this.handleError<any>('updateLegalfile'))
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
    this.reportService.addReport( content );
      // .subscribe(legalcase => {
      //   this.legalcases.push(legalcase);
      // });
  }
  /** Log a LegalfileService report with the ReportService */
  // private log(report: string) {
  //   this.reportService.addReport('LegalfileService: ' + report);
  // }
}
