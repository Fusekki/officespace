import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from '../classes/project';

import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompanyService {

  private CompanyUrl = 'api/companies';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET Companyes from the server */
  getCompanies (): Observable<Project[]> {
    return this.http.get<Project[]>(this.CompanyUrl)
      .pipe(
        tap(Project => this.log(`fetched legal files`)),
        catchError(this.handleError('getCompany', []))
      );
  }

  /** GET Project by id. Return `undefined` when id not found */
  getCompanyNo404<Data>(id: number): Observable<Project> {
    const url = `${this.CompanyUrl}/?id=${id}`;
    return this.http.get<Project[]>(url)
      .pipe(
        map(Project => Project[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Project id=${id}`);
        }),
        catchError(this.handleError<Project>(`getCompany id=${id}`))
      );
  }

  /** GET Project by id. Will 404 if id not found */
  getCompany(id: number): Observable<Project> {
    const url = `${this.CompanyUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched Project id=${id}`)),
      catchError(this.handleError<Project>(`getCompany id=${id}`))
    );
  }

  /* GET Companyes whose name contains search term */
  searchCompany(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if not search term, return empty Project array.
      return of([]);
    }
    return this.http.get<Project[]>(`api/Project/?title=${term}`).pipe(
      tap(_ => this.log(`found Project matching "${term}"`)),
      catchError(this.handleError<Project[]>('searchCompany', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Project to the server */
  addCompany (Project: Project): Observable<Project> {
    return this.http.post<Project>(this.CompanyUrl, Project, httpOptions).pipe(
      tap((Project: Project) => this.log(`added Project w/ id=${Project.id}`)),
      catchError(this.handleError<Project>('addCompany'))
    );
  }

  /** DELETE: delete the Project from the server */
  deleteCompany (Project: Project | number): Observable<Project> {
    const id = typeof Project === 'number' ? Project : Project.id;
    const url = `${this.CompanyUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Project id=${id}`)),
      catchError(this.handleError<Project>('deleteCompany'))
    );
  }

  /** PUT: update the Project on the server */
  updateCompany (Project: Project): Observable<any> {
    return this.http.put(this.CompanyUrl, Project, httpOptions).pipe(
      tap(_ => this.log(`updated Project id=${Project.id}`)),
      catchError(this.handleError<any>('updateCompany'))
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

}
