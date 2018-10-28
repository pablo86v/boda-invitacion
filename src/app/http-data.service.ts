import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  public apiURL= "hahaha" ;
  private headers: HttpHeaders;

  constructor(public http : HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
   }


  insert(apiName,obj):  Observable<any> {
    return this.http.post<boolean>(this.apiURL + apiName + 'insertar',obj, {headers: this.headers})
    .pipe(
      tap(data => this.log(apiName + "::insert()")),
      catchError(this.handleError(apiName + '::insert()',[]))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
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
    console.log(message);
  }


  
}