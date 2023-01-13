import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  token:any;

  constructor(private http : HttpService) { 
    this.token = localStorage.getItem('token');
  }
  getOrders(){
    console.log("Getting wishlist");

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': 'bearer '+this.token
      })
    }
    return this.http.getService('/Order/GetAllOrders',true,header)
  }
  placeOrder(data:any){
    console.log("Placing order");
    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': 'bearer '+this.token
      })
    }
    return this.http.postService('/Order/AddOrder',data,true,header)
  }
}
