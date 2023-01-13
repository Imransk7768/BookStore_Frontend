import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/Services/AddressService/address.service';
import { BookService } from 'src/app/Services/bookServices/book.service';

@Component({
  selector: 'app-getallbooks',
  templateUrl: './getallbooks.component.html',
  styleUrls: ['./getallbooks.component.scss']
})
export class GetallbooksComponent implements OnInit {
  // bookList:any;
  // totalbooks:any;
  // sortBy:any='Sort by relevance';

  token:any;
  //bookarray:any;
  bookList:any;
  totalbooks:any;
  sortBy:any='Sort by relevance';
  userList:any;
  constructor(private book:BookService,private router:Router,private Address:AddressService) { 

  }

  ngOnInit(): void {
    this.getAllbooks()

    // localStorage.getItem("token")
    // localStorage.getItem("userId")
  }
  
  getAllbooks(){
     this.book.getAllBooks().subscribe((request:any)=> {
      console.log("request data", request);
      this.bookList = request.data;
      this.bookList.reverse();
      console.log("List: ",this.bookList);      
      })

      this.Address.getUserData().subscribe((response: any) => {
        console.log(response.data);
        this.userList = response.data;

      this.userList=this.userList.filter((response:any)=>{
        localStorage.setItem('userId',response.userId)
        localStorage.setItem('fullName',response.fullName)
        localStorage.setItem('mobileNumber',response.mobileNumber)
      })
    })
    }
  quickView(bookId:any){
      localStorage.setItem('bookId',bookId)
      console.log(bookId);
      
      this.router.navigateByUrl("/dashboard/displaybook");
    }
}
