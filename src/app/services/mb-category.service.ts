import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MbCategory } from '../classes/mb-category';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MbCategoryService {

  private mbcategoriesUrl = 'api/mbcategories';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET mbcategoryes from the server */
  getMbCategories (): Observable<MbCategory[]> {
    return this.http.get<MbCategory[]>(this.mbcategoriesUrl)
      .pipe(
        tap(mbcategories => this.log(`fetched category cases`)),
        catchError(this.handleError('getMbCategories', []))
      );
  }

  /** GET mbcategory by id. Return `undefined` when id not found */
  getMbCategoryNo404<Data>(id: number): Observable<MbCategory> {
    const url = `${this.mbcategoriesUrl}/?id=${id}`;
    return this.http.get<MbCategory[]>(url)
      .pipe(
        map(mbcategories => mbcategories[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} mbcategory id=${id}`);
        }),
        catchError(this.handleError<MbCategory>(`getMbCategory id=${id}`))
      );
  }

  /** GET mbcategory by id. Will 404 if id not found */
  getMbCategory(id: number): Observable<MbCategory> {
    const url = `${this.mbcategoriesUrl}/${id}`;
    return this.http.get<MbCategory>(url).pipe(
      tap(_ => this.log(`fetched mbcategory id=${id}`)),
      catchError(this.handleError<MbCategory>(`getMbCategory id=${id}`))
    );
  }

  /* GET mbcategoryes whose name contains search term */
  searchMbCategories(term: string): Observable<MbCategory[]> {
    if (!term.trim()) {
      // if not search term, return empty mbcategory array.
      return of([]);
    }
    return this.http.get<MbCategory[]>(`api/mbcategories/?name=${term}`).pipe(
      tap(_ => this.log(`found mbcategories matching "${term}"`)),
      catchError(this.handleError<MbCategory[]>('searchMbCategories', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new mbcategory to the server */
  addMbCategory (mbcategory: MbCategory): Observable<MbCategory> {
    return this.http.post<MbCategory>(this.mbcategoriesUrl, mbcategory, httpOptions).pipe(
      tap((mbcategory: MbCategory) => this.log(`added mbcategory w/ id=${mbcategory.id}`)),
      catchError(this.handleError<MbCategory>('addMbCategory'))
    );
  }

  /** DELETE: delete the mbcategory from the server */
  deleteMbCategory (mbcategory: MbCategory | number): Observable<MbCategory> {
    const id = typeof mbcategory === 'number' ? mbcategory : mbcategory.id;
    const url = `${this.mbcategoriesUrl}/${id}`;

    return this.http.delete<MbCategory>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted mbcategory id=${id}`)),
      catchError(this.handleError<MbCategory>('deleteMbCategory'))
    );
  }

  /** PUT: update the mbcategory on the server */
  updateMbCategory (mbcategory: MbCategory): Observable<any> {
    return this.http.put(this.mbcategoriesUrl, mbcategory, httpOptions).pipe(
      tap(_ => this.log(`updated mbcategory id=${mbcategory.id}`)),
      catchError(this.handleError<any>('updateMbCategory'))
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
      // .subscribe(mbcategory => {
      //   this.mbcategories.push(mbcategory);
      // });
  }

  // /** Log a MbCategoryService report with the ReportService */
  // private log(report: string) {
  //   this.reportService.addReport('MbCategoryService: ' + report);
  // }
}
