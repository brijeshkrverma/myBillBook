import { Injectable } from '@angular/core';
import {Login} from '../models/login';
import { catchError, map, retry } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl='http://localhost:4000/api';

  headers=new HttpHeaders().set('Content-Type','application/json')

  constructor(private http:HttpClient) { }

  userRegister(data:any){
    let regUrl=`${this.baseUrl}/reg`
          return this.http.post<Login>(regUrl,data).pipe(
            catchError(this.errorMgmt)
          )
  }

  userLogin(data:any):Observable<any>{
    let login=`${this.baseUrl}/login`;
    return this.http.post(login,data).pipe(
      catchError(this.errorMgmt)
    )
  }

  setToken(token:string){
    localStorage.setItem('token',token);
    console.log(token)
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getAdminPayload(){
    var token=localStorage.getItem('token');
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return null
    }
  }

  ():any{
    var userPayload=this.getAdminPayload();
    if(userPayload){
      return userPayload.exp > Date.now()/1000;
    }
  }


//Get All Users

   // Error handling 
   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
