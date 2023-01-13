import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  token: any;

  constructor(private httpservice:HttpService) { 
    this.token = localStorage.getItem('token')
  }

  getAllBooks(){
    console.log("Get All books Details");

    let header = {
      headers: new HttpHeaders({
      
        'Content-Type' : 'application/json' ,
        //'Authorization' :'bearer '+this.token 
      })
    }
    return this.httpservice.getService('/Book/GetAllBooks', true, header)
  }
  getBookById(bookId:any){
    console.log("Get book Details ById");

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    }
    return this.httpservice.getService('/Book/GetBookById?bookId=' +bookId,true,header)
  }  
}
