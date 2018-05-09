import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageBoard } from '../classes/message-board';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MessageBoardService {
  private messageboardUrl = 'api/messageboards';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) {
  }

  /** GET messagees from the server */
  getMessageBoards (): Observable<MessageBoard[]> {
    return this.http.get<MessageBoard[]>(this.messageboardUrl)
      .pipe(
        tap(messages => this.log(`fetched messages files`)),
        catchError(this.handleError('getMessageBoards', []))
      );
  }

  /** GET message by id. Return `undefined` when id not found */
  getMessageBoardNo404<Data>(id: number): Observable<MessageBoard> {
    const url = `${this.messageboardUrl}/?id=${id}`;
    return this.http.get<MessageBoard[]>(url)
      .pipe(
        map(messages => messages[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} message id=${id}`);
        }),
        catchError(this.handleError<MessageBoard>(`getMessageBoard id=${id}`))
      );
  }


    /** GET message by id. Will 404 if id not found */
    getMessageBoard(id: number): Observable<MessageBoard> {
      const url = `${this.messageboardUrl}/${id}`;
      return this.http.get<MessageBoard>(url).pipe(
        tap(_ => this.log(`fetched message id=${id}`)),
        catchError(this.handleError<MessageBoard>(`getMessageBoard id=${id}`))
      );
    }

    /* GET messagees whose name contains search term */
    searchMessageBoards(term: string): Observable<MessageBoard[]> {
      if (!term.trim()) {
        // if not search term, return empty message array.
        return of([]);
      }
      return this.http.get<MessageBoard[]>(`api/messages/?title=${term}`).pipe(
        tap(_ => this.log(`found messages matching "${term}"`)),
        catchError(this.handleError<MessageBoard[]>('searchMessageBoards', []))
      );
    }

    /** POST: add a new message to the server */
    addMessageBoard (message: MessageBoard): Observable<MessageBoard> {
      return this.http.post<MessageBoard>(this.messageboardUrl, message, httpOptions).pipe(
        tap((message: MessageBoard) => this.log(`added message w/ id=${message.id}`)),
        catchError(this.handleError<MessageBoard>('addMessageBoard'))
      );
    }

    /** DELETE: delete the message from the server */
    deleteMessageBoard (message: MessageBoard | number): Observable<MessageBoard> {
      const id = typeof message === 'number' ? message : message.id;
      const url = `${this.messageboardUrl}/${id}`;

      return this.http.delete<MessageBoard>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted message id=${id}`)),
        catchError(this.handleError<MessageBoard>('deleteMessageBoard'))
      );
    }

    /** PUT: update the message on the server */
    updateMessageBoard (message: MessageBoard): Observable<any> {
      return this.http.put(this.messageboardUrl, message, httpOptions).pipe(
        tap(_ => this.log(`updated message id=${message.id}`)),
        catchError(this.handleError<any>('updateMessageBoard'))
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

    /** Log a MessageBoardService report with the ReportService */
    private log(report: string) {
      this.reportService.addReport('MessageBoardService: ' + report);
    }
}
