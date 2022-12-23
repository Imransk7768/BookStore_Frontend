import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
token:any;

  constructor(private httpservice: HttpService) {
    this.token= localStorage.getItem("token")
   }
  
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
forgetpassword(reqdata:any){
  let header = {
    headers: new HttpHeaders(
      {
        'Content-type' : 'application/json' ,
        'Authorization':this.token
      })
  }
  return this.httpservice.postService('/User/ForgetPassword?email='+(reqdata.Email),reqdata,false,header)
}
 resetpassword(reqdata:any, token:any){
  console.log(reqdata);

 let header = {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'bearer '+this.token
      })
  }
  return this.httpservice.putService(`/User/ResetPassword?newPassword=${reqdata.newPassword}&confirmPassword=${reqdata.confirmPassword}`,{},true,header)
  //return this.httpservice.putService('/User/ResetPasswordord',reqdata,true,header)
}
}
