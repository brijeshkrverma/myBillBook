import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Login} from '../models/login';
import { Party } from '../models/party';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoicesService {

apiURL:String='http://localhost:4000/api';
partyURL:String='http://localhost:4000/party';
itemsURL:String='http://localhost:4000/items';
transUrl:String='http://localhost:4000/transection'

authToken:any;
  constructor(private http:HttpClient) { }
  //Get User
  getUsers():Observable<Login[]>{
    this.getToken();
    let headers=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: this.authToken
    });
    let url=`${this.apiURL}/user`;
    return this.http.get<Login[]>(url,{headers:headers}).pipe(
      catchError(this.errorMgmt)
    )
  }
    
  //Get Party by id From party.service.ts

  getPartuNyName(partyName:any):Observable<any>
  {
    this.getToken();
    let headers=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: this.authToken
    });
    let url =`${this.partyURL}/partyName?partyName=${partyName}`;
    return this.http.get<any>(url,{headers:headers}).pipe(
      catchError(this.errorMgmt)
    )

  }

//Register Transection of User
transection(data:any)
{
  this.getToken();
  let headers=new HttpHeaders({Authorization: this.authToken });
  let url=`${this.transUrl}/trans`;
  return this.http.post(url,data,{headers:headers}).pipe(
    catchError(this.errorMgmt)
  )
}

//Get All Transection
getAllTrans():Observable<any>
{
  this.getToken();
  let headers=new HttpHeaders({Authorization: this.authToken });
  let url=`${this.transUrl}/getTrans`;
  return this.http.get(url,{headers:headers}).pipe(
    catchError(this.errorMgmt)
  )

}

  //Get Items By Id From item.service.ts


  
  getToken(){
    var token=localStorage.getItem('token');
    console.log("Tokens: "+token);

    this.authToken=token;
  }

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


