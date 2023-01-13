import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/Services/AddressService/address.service';
import { CartService } from 'src/app/Services/cartServices/cart.service';
import { OrdersService } from 'src/app/Services/OrderServices/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartlist:any;
  bookId:any;
  step: number = 0;

  userList:any;
  fullName: any;
  mobile: any;
  addressList: any;
  addressId = 0;
  userId:any;
  addressObj: any;
  isAddEditAddress: boolean = false;
  edit =false;
  address: any;
  city: any;
  state: any;
  addressType: any

  constructor(private cart:CartService,private router:Router,private Address:AddressService, private order: OrdersService) { 
  }

  ngOnInit(): void {
    this.bookId = localStorage.getItem('bookId')
    this.userId = localStorage.getItem('userId')
    this.getCartlist();
    this.getUserData();
    this.getAllAddress();
  }
  getCartlist() {
    this.cart.getCartItems().subscribe((response: any) => {
      this.cartlist = response.data;
      console.log(response.data);
      console.log(response);
      console.log('BookIds : ',this.cartlist);
    });
  }
  decreaseQty(cartId: any, bookQuantity: any) {
    console.log(bookQuantity);
    this.cart.updateCart(cartId, (bookQuantity - 1)).subscribe((response: any) => {
      console.log("Cart Quantity Decreased",response);
      console.log(response);
      this.getCartlist();
    })
  }

  increaseQty(cartId: any, BookQuantity: any) {
    console.log(BookQuantity);
    this.cart.updateCart(cartId, (BookQuantity + 1)).subscribe((response: any) => {
      console.log("Cart Quantity Increased",response);
      console.log(response);
      this.getCartlist();
    })
  }
  
  removeFromCart(cartId: any) {
    this.cart.removeFromCart(cartId).subscribe((response: any) => {
      console.log("Removed Book From Cart");
      this.getCartlist();
    })
  }
  stepUp2() {
    this.step = 2;
  }
  stepUp() {
    this.step = 1;
  }
  getAllAddress() {
    this.Address.getAllAddress().subscribe((response: any) => {
      console.log(response.data);
      this.addressList = response.data;
    })
  }
  addOrder(){
    if (this.cartlist?.length > 0){
      console.log("Cart list",this.cartlist.bookId);
      let data={
        BookId : parseInt(this.bookId),
        AddressId : this.addressId,
      }
      this.order.placeOrder(data).subscribe((response:any) =>{
        console.log("Order Placed",response);
        this.getCartlist();
        this.step=0;
        this.router.navigateByUrl('/dashboard/placeorder')
        
      })
    }
  }
  addNewAddress() {
    this.isAddEditAddress = true;
    this.addressObj = [];
    this.address = '';
    this.fullName = '';
    this.mobile = '';
    this.city = '';
    this.state = '';
    this.addressType = '';
  }
  // editAddress() {
  //   this.edit = true;
  // }
  editAddress() {
    this.isAddEditAddress = true;
    this.addressObj = this.addressList.filter((object:any)=>{
    })
    this.addressObj = this.addressObj[0];
    this.address = this.addressObj.address;
    this.city = this.addressObj.city;
    this.state = this.addressObj.state;
    this.addressType = this.addressObj.typeId;
  }
  updateAddress(addressId: any) {
    if (this.address && this.city && this.state && this.addressType && addressId != '') {
      let reqData = {
        address: this.address,
        city: this.city,
        state: this.state,
        type: Number(this.addressType),
        addressId: addressId
      }
      console.log(reqData)
      this.Address.updateAddress(reqData).subscribe((response: any) => {
        console.log("Address Updated", response);
        this.getAllAddress();
      })
    }
  }
  addAddress(){
    if(this.address && this.city && this.state && this.addressType != ''){
      let reqdata = {
        address: this.address,
        city: this.city,
        state: this.state,
        type: Number(this.addressType),
        fullName: this.fullName,
        mobile:Number(this.mobile)

      }
      console.log(reqdata);
      this.Address.addAddress(reqdata).subscribe((response:any)=> {
        console.log("New Address Added", response);
        this.getAllAddress();
      })
    }
  }
  getUserData()
  {
    this.Address.getUserData().subscribe((response: any) => {
      console.log(response.data);
      this.userList = response.data;
    })
  }
}