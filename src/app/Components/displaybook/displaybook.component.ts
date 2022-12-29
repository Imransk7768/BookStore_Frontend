import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Services/bookServices/book.service';

@Component({
  selector: 'app-displaybook',
  templateUrl: './displaybook.component.html',
  styleUrls: ['./displaybook.component.scss']
})
export class DisplaybookComponent implements OnInit {
  
  bookId = localStorage.getItem('bookId')
  //bookId:any;
  book:any;
  ratingPoint:any=0;
  comment:any;
  feedbackList:any;
  addedToCart:any=false;


  constructor(private bookService:BookService) { }

  ngOnInit(): void {
     //this.bookId = this.activate.snapshot.paramMap.get('bookId');
     this.bookId = localStorage.getItem('bookId')
     this.getBookById(this.bookId);
     this.getAllFeedback(this.bookId);
  }
  // getBookById(bookId:any){
  //   this.bookService.getBookById(bookId).subscribe((response: any) => {
  //     this.book = response.data;
  //   });
  // }
  getBookById(bookId:any){
    this.bookService.getBookById(bookId).subscribe((response: any) => {
      console.log(response);
      this.book = response.response;
      console.log(response.response);
    });
  }

  getAllFeedback(bookId: any){
    this.bookService.getAllFeedback(bookId).subscribe((response: any) => {
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
    this.bookService.addFeedback(reqData).subscribe((response: any) => {
      console.log("Feedback submitted successfully", response);
      this.getAllFeedback(this.bookId);
    });
    this.comment='';
    this.ratingPoint=0;
  }
  // addToCart(){
  //   this.addedToCart=true;
  //   let reqData = {
  //     BookId: this.book.bookId,
  //     BookInCart: 1
  //   }
  //   this.bookService.addToCart(reqData,this.bookId).subscribe((response: any) => {
  //     console.log("Added to cart", response);
  //   });
  // }

  // addToWishlist(){
  //   let reqData = {
  //     BookId: this.book.bookId,
  //   }
  //   this.bookService.addToWishlist(reqData,this.bookId).subscribe((response: any) => {
  //     console.log("Added to wishlist", response);
  //   });
  // }

}
