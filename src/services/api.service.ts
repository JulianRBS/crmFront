
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/internal/operators";
import {Observable, of} from "rxjs";
import {UrlService} from "./url.service";



@Injectable()
export class ApiService {

  private getUrl = this.url.getLocal();  // URL to web api

  constructor(
    private http: HttpClient,private url:UrlService) { }


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  /** GET heroes from the server */
  get(finish): Observable<any> {
    return this.http.get(this.getUrl+"/"+finish,this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched')),
        catchError(this.handleError('get', []))
      );
  }

  getBy(finish,id: number): Observable<any> {
    const url = `${this.getUrl+"/"+finish}/${id}`;
    return this.http.get(url,this.httpOptions).pipe(
      tap(_ => this.log(`fetched  id=${id}`)),
      catchError(this.handleError(`get id=${id}`))
    );
  }

  post(finish,item): Observable<any> {
    return this.http.post(this.getUrl+'/'+finish, item, this.httpOptions).pipe(
      tap((item) => this.log(`added  w/ id=${item}`)),
      catchError(this.handleError('add'))
    );
  }

  update(finish,item,id): Observable<any> {
    return this.http.put(`${this.getUrl+'/'+finish}/${id}`, item).pipe(
      tap(_ => this.log(`updated  id=${item.id}`)),
      catchError(this.handleError('update'))
    );
  }


  /** DELETE: delete the hero from the server */
  delete(finish,id): Observable<any> {
    const url = `${this.getUrl+'/'+finish}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted  id=${id}`)),
      catchError(this.handleError('delete'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
   console.log(message)
  }
}
