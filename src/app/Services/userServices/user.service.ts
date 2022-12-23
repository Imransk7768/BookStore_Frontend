import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
token:any;

  constructor(private httpservice: HttpService) { }
  
  register(reqdata:any){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type' : 'application/json' ,
          //Authorization : 'token' 
        })
    }
    return this.httpservice.postService('/User/Register',reqdata,false,header)
  }
  login(data:any){
    let header={
      Headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
  }
  return this.httpservice.postService('/User/Login',data,false,header)
}
}
