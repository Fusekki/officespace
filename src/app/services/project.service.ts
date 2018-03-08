import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from '../classes/project';
import { ReportService } from './report.service';
import { Report } from '../classes/report';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {

  private projectsUrl = 'api/projects';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET projectes from the server */
  getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(projects => this.log(`fetched legal cases`)),
        catchError(this.handleError('getProjects', []))
      );
  }

  /** GET project by id. Return `undefined` when id not found */
  getProjectNo404<Data>(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/?id=${id}`;
    return this.http.get<Project[]>(url)
      .pipe(
        map(projects => projects[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} project id=${id}`);
        }),
        catchError(this.handleError<Project>(`getProject id=${id}`))
      );
  }

  /** GET project by id. Will 404 if id not found */
  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /* GET projectes whose name contains search term */
  searchProjects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if not search term, return empty project array.
      return of([]);
    }
    return this.http.get<Project[]>(`api/projects/?title=${term}`).pipe(
      tap(_ => this.log(`found projects matching "${term}"`)),
      catchError(this.handleError<Project[]>('searchProjects', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new project to the server */
  addProject (project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
      tap((project: Project) => this.log(`added project w/ id=${project.id}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  /** DELETE: delete the project from the server */
  deleteProject (project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

  /** PUT: update the project on the server */
  updateProject (project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, httpOptions).pipe(
      tap(_ => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
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
    this.reportService.addReport({ content } as Report)
      // .subscribe(legalcase => {
      //   this.legalcases.push(legalcase);
      // });
  }

  /** Log a ProjectService report with the ReportService */
  // private log(report: string) {
  //   this.reportService.addReport('ProjectService: ' + report);
  // }
}
