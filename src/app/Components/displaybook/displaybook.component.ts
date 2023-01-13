import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/Services/bookServices/book.service';
import { CartService } from 'src/app/Services/cartServices/cart.service';
import { FeedbackService } from 'src/app/Services/feedback/feedback.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';

@Component({
  selector: 'app-displaybook',
  templateUrl: './displaybook.component.html',
  styleUrls: ['./displaybook.component.scss']
})
export class DisplaybookComponent implements OnInit {
  
  bookId = localStorage.getItem('BookId')
  //bookId:any;
  book:any;
  ratingPoint:any=0;
  comment:any;
  feedbackList:any;
  addedToCart:any=false;
  userId:any;
  //UserId:any;
  cartlist:any;

  constructor(private bookService:BookService , private feedback:FeedbackService,private cart:CartService ,private wishlist:WishlistService,private router:Router) { 

  }

  ngOnInit(): void {
    this.bookId = localStorage.getItem('bookId')
    this.userId = localStorage.getItem('userId')
     this.getBookById(this.bookId);
     this.getAllFeedback(this.bookId);

  }
  getBookById(bookId:any){
    this.bookService.getBookById(bookId).subscribe((response: any) => {
      console.log(response);
      this.book = response.response;
      console.log(response.response);
    });
  }

  getAllFeedback(bookId: any){
    this.feedback.getAllFeedback(bookId).subscribe((response: any) => {
      console.log(response);
      this.feedbackList = response.data;
    });
  }

  addFeedback(){
    let reqData = {
      Rating: parseInt(this.ratingPoint),
      Comment: this.comment,
      BookId: this.book.bookId
    }
    console.log(reqData);
    this.feedback.addFeedback(reqData).subscribe((response: any) => {
      console.log("Feedback submitted :", response);
      this.getAllFeedback(this.bookId);
    });
    this.comment='';
    this.ratingPoint=0;
  }
  addToCart(){
    console.log(this.book)
    this.addedToCart=true;
    let reqData = {
      bookId: this.book.bookId,
      bookInCart: 1
    }
    this.cart.addToCart(reqData).subscribe((response: any) => {
    //this.userId = localStorage.getItem('userId')
    console.log("Cart Added", response);
    this.cartlist=response.data;
    console.log(this.cartlist);
    //this.router.navigateByUrl('/dashboard/cart')
    });
  }

  addToWishlist(){
    let reqData = {
      BookId: this.book.bookId,
    }
    this.wishlist.addToWishlist(reqData,this.bookId).subscribe((response: any) => {
      console.log("wishlist Added", response);
      this.router.navigateByUrl('/dashboard/wishlist')

    });
  }
}
