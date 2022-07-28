import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  baseUrl:String='http://localhost:4000/items';
  authToken:any;
  constructor(private http:HttpClient) { }

  createItem(data:any){
    this.getToken();
     let headers=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization: this.authToken
     });
     let url=`${this.baseUrl}/create-item`;
     return this.http.post(url,data,{headers:headers}).pipe(
      catchError(this.errorMgmt)
     )
  }

  //Get All Items
  getItems():Observable<any>{
    this.getToken();
    let headers=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: this.authToken
    });
    let url=`${this.baseUrl}/items`;
    return this.http.get(url,{headers:headers}).pipe(
      catchError(this.errorMgmt)
    )
  }

  //update Item By Id
  updateItem(id:any,data:any):Observable<any>
  {
    let headers=new HttpHeaders({"Content-Type":"application/json"});
    let url=`${this.baseUrl}/edit/${id}`;
    return this.http.put(url,data,{headers:headers}).pipe(
      catchError(this.errorMgmt)
    )
  }
  
  //delete item by id


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
