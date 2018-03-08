import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Team } from '../classes/team';
import { ReportService } from './report.service';
import { Report } from '../classes/report';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {

  private teamsUrl = 'api/teams';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET Teames from the server */
  getTeams (): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
      .pipe(
        tap(teams => this.log(`fetched legal files`)),
        catchError(this.handleError('getteams', []))
      );
  }

  /** GET Team by id. Return `undefined` when id not found */
  getTeamNo404<Data>(id: number): Observable<Team> {
    const url = `${this.teamsUrl}/?id=${id}`;
    return this.http.get<Team[]>(url)
      .pipe(
        map(teams => teams[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Team id=${id}`);
        }),
        catchError(this.handleError<Team>(`getTeam id=${id}`))
      );
  }

  /** GET Team by id. Will 404 if id not found */
  getTeam(id: number): Observable<Team> {
    const url = `${this.teamsUrl}/${id}`;
    return this.http.get<Team>(url).pipe(
      tap(_ => this.log(`fetched Team id=${id}`)),
      catchError(this.handleError<Team>(`getTeam id=${id}`))
    );
  }

  /* GET Teames whose name contains search term */
  searchteams(term: string): Observable<Team[]> {
    if (!term.trim()) {
      // if not search term, return empty Team array.
      return of([]);
    }
    return this.http.get<Team[]>(`api/teams/?title=${term}`).pipe(
      tap(_ => this.log(`found teams matching "${term}"`)),
      catchError(this.handleError<Team[]>('searchteams', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Team to the server */
  addTeam (Team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamsUrl, Team, httpOptions).pipe(
      tap((Team: Team) => this.log(`added Team w/ id=${Team.id}`)),
      catchError(this.handleError<Team>('addTeam'))
    );
  }

  /** DELETE: delete the Team from the server */
  deleteTeam (Team: Team | number): Observable<Team> {
    const id = typeof Team === 'number' ? Team : Team.id;
    const url = `${this.teamsUrl}/${id}`;

    return this.http.delete<Team>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Team id=${id}`)),
      catchError(this.handleError<Team>('deleteTeam'))
    );
  }

  /** PUT: update the Team on the server */
  updateTeam (Team: Team): Observable<any> {
    return this.http.put(this.teamsUrl, Team, httpOptions).pipe(
      tap(_ => this.log(`updated Team id=${Team.id}`)),
      catchError(this.handleError<any>('updateTeam'))
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

  /** Log a teamservice report with the ReportService */
  // private log(report: string) {
  //   this.reportService.addReport('teamservice: ' + report);
  // }
}
