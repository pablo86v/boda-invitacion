import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  public apiURL= "http://pablovalenzuela.esy.es/api/invitados" ;
  public headers: Headers;

  constructor(public http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
   }


   getAll() : Observable<any> {
    return this.http.get(this.apiURL + "/traerTodos")
    .pipe(
      map(data => data.json())
    );
  }



  insert(obj):  Observable<any> {
    return this.http.post(this.apiURL + "/insertar", obj , {headers: this.headers})
    .pipe(
      // map(data => data.json())
      map(data => console.log("ok"))
    );
  }

 


  
}