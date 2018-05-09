import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Watercooler } from '../classes/watercooler';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class WatercoolerService {

    private WatercoolerUrl = 'api/watercoolers';  // URL to web api

    constructor(
      private http: HttpClient,
      private reportService: ReportService) { }

    /** GET Watercooleres from the server */
    getWatercoolers (): Observable<Watercooler[]> {
      return this.http.get<Watercooler[]>(this.WatercoolerUrl)
        .pipe(
          tap(Watercooler => this.log(`fetched watercoolers`)),
          catchError(this.handleError('getWatercooler', []))
        );
    }

    /** GET Watercooler by id. Return `undefined` when id not found */
    getWatercoolerNo404<Data>(id: number): Observable<Watercooler> {
      const url = `${this.WatercoolerUrl}/?id=${id}`;
      return this.http.get<Watercooler[]>(url)
        .pipe(
          map(Watercooler => Watercooler[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} Watercooler id=${id}`);
          }),
          catchError(this.handleError<Watercooler>(`getWatercooler id=${id}`))
        );
    }

    /** GET Watercooler by id. Will 404 if id not found */
    getWatercooler(id: number): Observable<Watercooler> {
      const url = `${this.WatercoolerUrl}/${id}`;
      return this.http.get<Watercooler>(url).pipe(
        tap(_ => this.log(`fetched Watercooler id=${id}`)),
        catchError(this.handleError<Watercooler>(`getWatercooler id=${id}`))
      );
    }

    /* GET Watercooleres whose name contains search term */
    searchWatercooler(term: string): Observable<Watercooler[]> {
      if (!term.trim()) {
        // if not search term, return empty Watercooler array.
        return of([]);
      }
      return this.http.get<Watercooler[]>(`api/Watercooler/?title=${term}`).pipe(
        tap(_ => this.log(`found Watercooler matching "${term}"`)),
        catchError(this.handleError<Watercooler[]>('searchWatercooler', []))
      );
    }

    //////// Save methods //////////

    /** POST: add a new Watercooler to the server */
    addWatercooler (Watercooler: Watercooler): Observable<Watercooler> {
      return this.http.post<Watercooler>(this.WatercoolerUrl, Watercooler, httpOptions).pipe(
        tap((Watercooler: Watercooler) => this.log(`added Watercooler w/ id=${Watercooler.id}`)),
        catchError(this.handleError<Watercooler>('addWatercooler'))
      );
    }

    /** DELETE: delete the Watercooler from the server */
    deleteWatercooler (Watercooler: Watercooler | number): Observable<Watercooler> {
      const id = typeof Watercooler === 'number' ? Watercooler : Watercooler.id;
      const url = `${this.WatercoolerUrl}/${id}`;

      return this.http.delete<Watercooler>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted Watercooler id=${id}`)),
        catchError(this.handleError<Watercooler>('deleteWatercooler'))
      );
    }

    /** PUT: update the Watercooler on the server */
    updateWatercooler (Watercooler: Watercooler): Observable<any> {
      return this.http.put(this.WatercoolerUrl, Watercooler, httpOptions).pipe(
        tap(_ => this.log(`updated Watercooler id=${Watercooler.id}`)),
        catchError(this.handleError<any>('updateWatercooler'))
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

    // /** Log a WatercoolerService report with the ReportService */
    // private log(report: string) {
    //   this.reportService.addReport('WatercoolerService: ' + report);
    // }

}
