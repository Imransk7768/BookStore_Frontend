import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/Services/bookServices/book.service';

@Component({
  selector: 'app-getallbooks',
  templateUrl: './getallbooks.component.html',
  styleUrls: ['./getallbooks.component.scss']
})
export class GetallbooksComponent implements OnInit {
  // token:any;
  // bookList:any;
  // totalbooks:any;
  // sortBy:any='Sort by relevance';

  token:any;
  //bookarray:any;
  bookList:any;
  totalbooks:any;
  sortBy:any='Sort by relevance';

  constructor(private book:BookService,private router:Router) { }

//   ngOnInit(): void {
//     this.GetAllBooks();  
//   }
//   GetAllBooks(){
//       this.book.getAllBooks().subscribe((request:any)=> {
//       console.log("request data", request);
//       this.bookList = request.data;
//       //this.bookList.reverse();
//     })
//   }
// }

  ngOnInit(): void {
    this.getAllbooks();    
  }
  
  getAllbooks(){
     this.book.getAllBooks().subscribe((request:any)=> {
      console.log("request data", request);
      this.bookList = request.data;
      this.bookList.reverse();
      console.log("List: ",this.bookList);      
      })
    }
  quickView(bookId:any){
      localStorage.setItem('bookId',bookId)
      console.log(bookId);
      
      this.router.navigateByUrl("/displaybook");
    }
}
