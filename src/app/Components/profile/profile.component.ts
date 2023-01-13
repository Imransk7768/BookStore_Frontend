import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressService } from 'src/app/Services/AddressService/address.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fullName: any;
  email:any;
  
  mobile: any;
  addressList: any;
  addressId = 0;
  userId:any;
  addressObj:any;
  isAddEditAddress:boolean=false;

  address:any;
  city:any;
  state:any;
  addressType:any

  constructor(private Address:AddressService,private snackBar:MatSnackBar) { 
    this.fullName = localStorage.getItem('name');
    this.mobile = localStorage.getItem('mobile');
    this.email = localStorage.getItem('email');
  }

  ngOnInit(): void {
    this.getAllAddress();
  }
  getAllAddress() {
    this.Address.getAllAddress().subscribe((response: any) => {
      console.log("Getall Address successful", response);
      this.addressList = response.data;
      if (this.addressList?.length > 0) {
        this.addressId = this.addressList[0].addressId;
      }
    });
  }
  editAddress(id: any) {
    this.isAddEditAddress = true;
    this.addressObj = this.addressList.filter((object:any)=>{
      return object.addressId == id;
    })
    this.addressObj = this.addressObj[0];
    this.address = this.addressObj.address;
    this.city = this.addressObj.city;
    this.state = this.addressObj.state;
    this.addressType = this.addressObj.typeId;
  }
  addNewAddress(){
    this.isAddEditAddress = true;
    this.addressObj = [];
    this.address='';
    this.city='';
    this.state='';
    this.addressType='';
  }

  cancel(){
    this.isAddEditAddress = false;
  }
  addAddress(){
    if(this.address && this.city && this.state && this.addressType != ''){
      let reqData = {
        address: this.address,
        city: this.city,
        state: this.state,
        typeId: Number(this.addressType)
      }
      this.Address.addAddress(reqData).subscribe((response: any) => {
        console.log("New Address Added successfully", response);
        this.getAllAddress();

        this.snackBar.open("New Address Added successfully", '', {
          duration: 2000,
        })
        this.isAddEditAddress = false;
      });
    }
    else{
      this.snackBar.open("Address fields should not be empty", '', {
        duration: 2000,
      })
    }
  }

  updateAddress(addressId:any){
    if(this.address && this.city && this.state && this.addressType && addressId != ''){
      let reqData = {
        address: this.address,
        city: this.city,
        state: this.state,
        typeId: Number(this.addressType),
        addressId: addressId
      }
      console.log(reqData)
      this.Address.updateAddress(reqData).subscribe((response: any) => {
        console.log("Address updated successfully", response);
        this.getAllAddress();

        this.snackBar.open("Address updated successfully", '', {
          duration: 2000,
        })
        this.isAddEditAddress = false;
      });
    }
    else{
      this.snackBar.open("Address fields should not be empty", '', {
        duration: 2000,
      })
    }
  }

  deleteAddress(addressId:any){
    if(this.addressList?.length>1){
      if(confirm("Are you sure, You want to delete this address?")){
      this.Address.deleteAddress(addressId).subscribe((response: any) => {
        console.log("Item removed from cart successfully", response);

        this.getAllAddress();
        this.snackBar.open("Address deleted successfully", '', {
          duration: 2000,
        })
        })
      }
    }
    else{
      this.snackBar.open("Can't delete default Address", '', {
        duration: 2000,
      })
    }
  }
}
