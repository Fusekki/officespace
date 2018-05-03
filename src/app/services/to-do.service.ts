import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ToDo } from '../classes/to-do';
import { ReportService } from './report.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ToDoService {

  private todoUrl = 'api/todos';  // URL to web api

  constructor(
    private http: HttpClient,
    private reportService: ReportService) {
  }

  /** GET todoes from the server */
  getToDos (): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.todoUrl)
      .pipe(
        tap(todos => this.log(`fetched todos files`)),
        catchError(this.handleError('getToDos', []))
      );
  }

  /** GET todo by id. Return `undefined` when id not found */
  getToDoNo404<Data>(id: number): Observable<ToDo> {
    const url = `${this.todoUrl}/?id=${id}`;
    return this.http.get<ToDo[]>(url)
      .pipe(
        map(todos => todos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} todo id=${id}`);
        }),
        catchError(this.handleError<ToDo>(`getToDo id=${id}`))
      );
  }


    /** GET todo by id. Will 404 if id not found */
    getToDo(id: number): Observable<ToDo> {
      const url = `${this.todoUrl}/${id}`;
      return this.http.get<ToDo>(url).pipe(
        tap(_ => this.log(`fetched todo id=${id}`)),
        catchError(this.handleError<ToDo>(`getToDo id=${id}`))
      );
    }

    /* GET todoes whose name contains search term */
    searchToDos(term: string): Observable<ToDo[]> {
      if (!term.trim()) {
        // if not search term, return empty todo array.
        return of([]);
      }
      return this.http.get<ToDo[]>(`api/todos/?title=${term}`).pipe(
        tap(_ => this.log(`found todos matching "${term}"`)),
        catchError(this.handleError<ToDo[]>('searchToDos', []))
      );
    }

    /** POST: add a new todo to the server */
    addToDo (todo: ToDo): Observable<ToDo> {
      return this.http.post<ToDo>(this.todoUrl, todo, httpOptions).pipe(
        tap((todo: ToDo) => this.log(`added todo w/ id=${todo.id}`)),
        catchError(this.handleError<ToDo>('addToDo'))
      );
    }

    /** DELETE: delete the todo from the server */
    deleteToDo (todo: ToDo | number): Observable<ToDo> {
      const id = typeof todo === 'number' ? todo : todo.id;
      const url = `${this.todoUrl}/${id}`;

      return this.http.delete<ToDo>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted todo id=${id}`)),
        catchError(this.handleError<ToDo>('deleteToDo'))
      );
    }

    /** PUT: update the todo on the server */
    updateToDo (todo: ToDo): Observable<any> {
      return this.http.put(this.todoUrl, todo, httpOptions).pipe(
        tap(_ => this.log(`updated todo id=${todo.id}`)),
        catchError(this.handleError<any>('updateToDo'))
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


    /** Log a TodoService report with the ReportService */
    private log(report: string) {
      this.reportService.addReport('ToDoService: ' + report);
    }
}
