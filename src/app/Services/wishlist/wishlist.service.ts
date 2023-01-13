import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token: any;

  constructor(private http: HttpService) {
    this.token = localStorage.getItem('token');
  }
  addToWishlist(reqData: any, bookId: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'bearer ' + this.token
      })
    }
    return this.http.postService('/WishList/AddWishlist?bookId='+bookId, reqData, true, header);
  }
  getWishList() {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token
      })
    }
    return this.http.getService('/WishList/GetWishlist', true, header)
  }
  removeFromWishlist(wishlistId: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token
      })
    }
    return this.http.deleteService('/WishList/DeleteWishList?wishlistId='+wishlistId, true, header)
  }
}