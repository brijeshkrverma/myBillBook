import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Party} from '../models/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  authToken:any;
  baseUrl='http://localhost:4000/party';

  headers=new HttpHeaders().set('Content-Type','application/json')
  constructor(private http:HttpClient) { }

  createParty(data:any){
    this.getToken();
    let headers=new HttpHeaders({Authorization: this.authToken });
        
    let url = `${this.baseUrl}/create-party`;
    return this.http.post(url, data,{headers:headers}).pipe(
      catchError(this.errorMgmt)
    )
  }
  //getAll party by user
  getAllParty():Observable<Party[]>{
    this.getToken();
    let headers=new HttpHeaders({"Content-Type": "application/json", 
    Authorization: this.authToken });
    let url=`${this.baseUrl}/getall`;
    return this.http.get<Party[]>(url,{headers:headers}).pipe(
      
      catchError(this.errorMgmt)
    )
  }
  //get all topaydata by user
  getAllPay():Observable<Party[]>{
    this.getToken();
    let headers =new HttpHeaders({"Content-Type":"application/json",
    Authorization: this.authToken});
    let url=`${this.baseUrl}/topaydata`;
    return this.http.get<Party[]>(url,{headers:headers}).pipe(
      catchError(this.errorMgmt)
    )
  }
  //get All tocollectdata by user
  getAllCollect():Observable<Party[]>{
    this.getToken();
    let headers=new HttpHeaders({"Content-Type":"application/json",
    Authorization: this.authToken});
    let url=`${this.baseUrl}/tocollectdata`;
    return this.http.get<Party[]>(url,{headers:headers}).pipe(
      catchError(this.errorMgmt)
    )
  }
  //Get Pack By ID
  getPackById(id:Party):Observable<any>{
       this.getToken();
       let headers=new HttpHeaders({"Content-Type":"application/json",
       Authorization: this.authToken});
       let url=`${this.baseUrl}/${id}`;
       return this.http.get<Party[]>(url,{headers:headers}).pipe(
         catchError(this.errorMgmt)
       )
  }

  getPartyByName(partyName:any):Observable<Party[]>{
   this.getToken();
   let headers=new HttpHeaders({
     'Content-Type':'application/json',Authorization: this.authToken});
   let url=`${this.baseUrl}/${partyName}`;
   return this.http.get<Party[]>(url,{headers:headers}).pipe(
     catchError(this.errorMgmt)
   )
  }

  //update openingBalance
  updateBalance(id:any,data:number):Observable<Party[]>
  {
    const heder=new HttpHeaders({
   "Content-Type":"text/html"
  })
    let url = `${this.baseUrl}/update/${id}`;
    return this.http.put<Party[]>(url,data).pipe(
      // catchError(this.errorMgmt)
    )
  }

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
