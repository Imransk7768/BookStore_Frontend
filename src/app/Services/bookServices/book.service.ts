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
        'Authorization' :'bearer '+this.token 
      })
    }
    return this.httpservice.getService('/Book/GetAllBooks', true, header)
  }
  getBookById(bookId:any){
    console.log("Get book Details");

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    }
    return this.httpservice.getService('/Book/RetriveBookById?bookId=' +bookId,true,header)
  }
  getAllFeedback(bookId:any){
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }
    return this.httpservice.getService(`/FeedBack/Getfeedback?bookId=` +bookId,false,header)
  }
  addFeedback(reqdata:any){
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+this.token
      })
    }
    return this.httpservice.postService('/FeedBack/Addfeedback', reqdata, true, header);
  }
  // addfeedback(data:any){
  //   console.log(data)
  //   let header = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.token}`
  //     })
  //   }
  //   return this.httpservice.postService('/FeedBack/AddFeedBack',data, true, header)
  // }
  // getfeedBack(bookId: any){
  //   this.token = localStorage.getItem('token');
  //   console.log("data")
  //   let header = {
  //     headers: new HttpHeaders({  
  //      'Content-Type': 'application/json',
  //     //  'Authorization': `Bearer ${this.token}`
  //     })
  //   }
  //   console.log(header); 
  //   return this.httpservice.getService('/FeedBack/GetFeedBack?bookId='+ bookId,false,header);
  
  // }
}
