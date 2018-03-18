import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MbPost } from '../classes/mb-post';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MbPostService {

  private MbpostsUrl = 'api/mbposts';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) { }

  /** GET MbPosts from the server */
  getMbPosts (): Observable<MbPost[]> {
    return this.http.get<MbPost[]>(this.MbpostsUrl)
      .pipe(
        tap(mbposts => this.log(`fetched legal files`)),
        catchError(this.handleError('getmbposts', []))
      );
  }

  /** GET MbPost by id. Return `undefined` when id not found */
  getMbPostNo404<Data>(id: number): Observable<MbPost> {
    const url = `${this.MbpostsUrl}/?id=${id}`;
    return this.http.get<MbPost[]>(url)
      .pipe(
        map(mbposts => mbposts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} MbPost id=${id}`);
        }),
        catchError(this.handleError<MbPost>(`getMbPost id=${id}`))
      );
  }

  /** GET MbPost by id. Will 404 if id not found */
  getMbPost(id: number): Observable<MbPost> {
    const url = `${this.MbpostsUrl}/${id}`;
    return this.http.get<MbPost>(url).pipe(
      tap(_ => this.log(`fetched MbPost id=${id}`)),
      catchError(this.handleError<MbPost>(`getMbPost id=${id}`))
    );
  }

  /* GET MbPostes whose name contains search term */
  searchmbposts(term: string): Observable<MbPost[]> {
    if (!term.trim()) {
      // if not search term, return empty MbPost array.
      return of([]);
    }
    return this.http.get<MbPost[]>(`api/mbposts/?title=${term}`).pipe(
      tap(_ => this.log(`found mbposts matching "${term}"`)),
      catchError(this.handleError<MbPost[]>('searchmbposts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new MbPost to the server */
  addMbPost (mbpost: MbPost): Observable<MbPost> {
    return this.http.post<MbPost>(this.MbpostsUrl, mbpost, httpOptions).pipe(
      tap((mbpost: MbPost) => this.log(`added MbPost w/ id=${mbpost.id}`)),
      catchError(this.handleError<MbPost>('addMbPost'))
    );
  }

  /** DELETE: delete the MbPost from the server */
  deleteMbPost (MbPost: MbPost | number): Observable<MbPost> {
    const id = typeof MbPost === 'number' ? MbPost : MbPost.id;
    const url = `${this.MbpostsUrl}/${id}`;

    return this.http.delete<MbPost>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted MbPost id=${id}`)),
      catchError(this.handleError<MbPost>('deleteMbPost'))
    );
  }

  /** PUT: update the MbPost on the server */
  updateMbPost (MbPost: MbPost): Observable<any> {
    return this.http.put(this.MbpostsUrl, MbPost, httpOptions).pipe(
      tap(_ => this.log(`updated MbPost id=${MbPost.id}`)),
      catchError(this.handleError<any>('updateMbPost'))
    );
  }

  /** GET MbPost by id. Will 404 if id not found */
  getCurrentMbPost(): Observable<MbPost> {
    const url = `${this.MbpostsUrl}/0`;
    return this.http.get<MbPost>(url).pipe(
      tap(_ => this.log(`fetched MbPost id=0`)),
      catchError(this.handleError<MbPost>(`getMbPost id=0`))
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

      // TODO: better job of transforming error for mbpost consumption
      this.log(`${operation} failed: ${error.report}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CompanyService report with the ReportService */
  private log(content: string) {
    if (!content) { return; }
    this.reportService.addReport( content );
  }


}
