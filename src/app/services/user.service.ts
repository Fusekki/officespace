import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../classes/user';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET Useres from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(users => this.log(`fetched legal files`)),
        catchError(this.handleError('getusers', []))
      );
  }

  /** GET User by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} User id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET Useres whose name contains search term */
  searchusers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty User array.
      return of([]);
    }
    return this.http.get<User[]>(`api/users/?title=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchusers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser (User: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, User, httpOptions).pipe(
      tap((User: User) => this.log(`added User w/ id=${User.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the User from the server */
  deleteUser (User: User | number): Observable<User> {
    const id = typeof User === 'number' ? User : User.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted User id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the User on the server */
  updateUser (User: User): Observable<any> {
    return this.http.put(this.usersUrl, User, httpOptions).pipe(
      tap(_ => this.log(`updated User id=${User.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** GET User by id. Will 404 if id not found */
  getCurrentUser(): Observable<User> {
    const url = `${this.usersUrl}/0`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched User id=0`)),
      catchError(this.handleError<User>(`getUser id=0`))
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

  /** Log a userservice report with the ReportService */
  // private log(report: string) {
  //   this.reportService.addReport('userservice: ' + report);
  // }

}
