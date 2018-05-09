import {Input} from '@angular/core';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Wcmessage} from '../classes/wc-message';
import {User} from '../classes/user';
import { ReportService } from './report.service';

import {FormControl} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WcmessageService {

  private wcmessagesUrl = 'api/wcmessages';  // URL to web api

  messageDate = new FormControl(new Date());


  constructor(
    private http: HttpClient,
    private reportService: ReportService) {
  }

  /** GET messagees from the server */
  getMessages (): Observable<Wcmessage[]> {
    return this.http.get<Wcmessage[]>(this.wcmessagesUrl)
      .pipe(
        tap(messages => this.log(`fetched messages files`)),
        catchError(this.handleError('getMessages', []))
      );
  }

  /** GET message by id. Return `undefined` when id not found */
  getMessageNo404<Data>(id: number): Observable<Wcmessage> {
    const url = `${this.wcmessagesUrl}/?id=${id}`;
    return this.http.get<Wcmessage[]>(url)
      .pipe(
        map(messages => messages[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} message id=${id}`);
        }),
        catchError(this.handleError<Wcmessage>(`getMessage id=${id}`))
      );
  }


    /** GET message by id. Will 404 if id not found */
    getMessage(id: number): Observable<Wcmessage> {
      const url = `${this.wcmessagesUrl}/${id}`;
      return this.http.get<Wcmessage>(url).pipe(
        tap(_ => this.log(`fetched message id=${id}`)),
        catchError(this.handleError<Wcmessage>(`getMessage id=${id}`))
      );
    }

    /* GET messagees whose name contains search term */
    searchMessages(term: string): Observable<Wcmessage[]> {
      if (!term.trim()) {
        // if not search term, return empty message array.
        return of([]);
      }
      return this.http.get<Wcmessage[]>(`api/messages/?title=${term}`).pipe(
        tap(_ => this.log(`found messages matching "${term}"`)),
        catchError(this.handleError<Wcmessage[]>('searchMessages', []))
      );
    }

    /** POST: add a new message to the server */
    addMessage (message: Wcmessage): Observable<Wcmessage> {
      return this.http.post<Wcmessage>(this.wcmessagesUrl, message, httpOptions).pipe(
        tap((message: Wcmessage) => this.log(`added message w/ id=${message.id}`)),
        catchError(this.handleError<Wcmessage>('addMessage'))
      );
    }

    /** DELETE: delete the message from the server */
    deleteMessage (message: Wcmessage | number): Observable<Wcmessage> {
      const id = typeof message === 'number' ? message : message.id;
      const url = `${this.wcmessagesUrl}/${id}`;

      return this.http.delete<Wcmessage>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted message id=${id}`)),
        catchError(this.handleError<Wcmessage>('deleteMessage'))
      );
    }

    /** PUT: update the message on the server */
    updateMessage (message: Wcmessage): Observable<any> {
      return this.http.put(this.wcmessagesUrl, message, httpOptions).pipe(
        tap(_ => this.log(`updated message id=${message.id}`)),
        catchError(this.handleError<any>('updateMessage'))
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

    /** Log a MessageService report with the ReportService */
    private log(report: string) {
      this.reportService.addReport('MessageService: ' + report);
    }

}
