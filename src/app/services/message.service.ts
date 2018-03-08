import {Input} from '@angular/core';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {Message} from '../classes/message';
import {User} from '../classes/user';
import { Report } from '../classes/report';
import { ReportService } from './report.service';

import {FormControl} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MessageService {

  private messagesUrl = 'api/messages';  // URL to web api

  messageDate = new FormControl(new Date());


  constructor(
    private http: HttpClient,
    private reportService: ReportService) {
  }

  /** GET messagees from the server */
  getMessages (): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl)
      .pipe(
        tap(messages => this.log(`fetched messages files`)),
        catchError(this.handleError('getMessages', []))
      );
  }

  /** GET message by id. Return `undefined` when id not found */
  getMessageNo404<Data>(id: number): Observable<Message> {
    const url = `${this.messagesUrl}/?id=${id}`;
    return this.http.get<Message[]>(url)
      .pipe(
        map(messages => messages[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} message id=${id}`);
        }),
        catchError(this.handleError<Message>(`getMessage id=${id}`))
      );
  }


    /** GET message by id. Will 404 if id not found */
    getMessage(id: number): Observable<Message> {
      const url = `${this.messagesUrl}/${id}`;
      return this.http.get<Message>(url).pipe(
        tap(_ => this.log(`fetched message id=${id}`)),
        catchError(this.handleError<Message>(`getMessage id=${id}`))
      );
    }

    /* GET messagees whose name contains search term */
    searchMessages(term: string): Observable<Message[]> {
      if (!term.trim()) {
        // if not search term, return empty message array.
        return of([]);
      }
      return this.http.get<Message[]>(`api/messages/?title=${term}`).pipe(
        tap(_ => this.log(`found messages matching "${term}"`)),
        catchError(this.handleError<Message[]>('searchMessages', []))
      );
    }

    //////// Save methods //////////
    // /** POST: add a new hero to the server */
    // addHero (hero: Hero): Observable<Hero> {
    //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    //     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    //     catchError(this.handleError<Hero>('addHero'))
    //   );
    // }



    /** POST: add a new message to the server */
    addMessage (message: Message): Observable<Message> {
      console.log(message);
      return this.http.post<Message>(this.messagesUrl, message, httpOptions).pipe(
        tap((message: Message) => this.log(`added message w/ id=${message.id}`)),
        catchError(this.handleError<Message>('addMessage'))
      );
    }

    /** DELETE: delete the message from the server */
    deleteMessage (message: Message | number): Observable<Message> {
      const id = typeof message === 'number' ? message : message.id;
      const url = `${this.messagesUrl}/${id}`;

      return this.http.delete<Message>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted message id=${id}`)),
        catchError(this.handleError<Message>('deleteMessage'))
      );
    }

    /** PUT: update the message on the server */
    updateMessage (message: Message): Observable<any> {
      return this.http.put(this.messagesUrl, message, httpOptions).pipe(
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

    /** Log a CompanyService report with the ReportService */
    private log(content: string) {
      console.log('Log: ' + content);
      // this.reportService.addReport('CompanyService: ' + report);
      if (!content) { return; }
      this.reportService.addReport({ content } as Report)
        // .subscribe(legalcase => {
        //   this.legalcases.push(legalcase);
        // });
    }

    /** Log a MessageService report with the ReportService */
    // private log(report: string) {
    //   this.reportService.addReport('MessageService: ' + report);
    // }

}
