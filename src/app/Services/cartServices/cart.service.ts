import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token: any;
  constructor(private http: HttpService) {
    this.token = localStorage.getItem('token');
   }
   getCartItems() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'bearer '+this.token
      })
    }
    return this.http.getService('/Cart/GetAllCartItem', true, header);
  }

  addToCart(reqData:any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+this.token
      })
    }
    return this.http.postService('/Cart/AddCart', reqData, true, header);
  }

  updateCart(cartId: any, bookQuantity: any) {
    console.log(cartId,bookQuantity);
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'bearer '+this.token
      })
    }
    return this.http.putService('/Cart/UpdateCart?cartId='+cartId+'&bookQty='+bookQuantity,cartId,true,header);
  }

  removeFromCart(cartId: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'bearer '+this.token
      })
    }
    return this.http.deleteService('/Cart/DeleteCart?cartId='+cartId, true, header);
  }



  getAllAddress() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'bearer '+this.token

      })
    }
    return this.http.getService('/Address/GetAllAddress?userId=', true, header);
  }
  placeOrder(data:any){
    console.log("Placing order");
    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': 'bearer '+this.token
      })
    }
    return this.http.postService('Order/AddOrder',data,true,header)
  }
  
}
