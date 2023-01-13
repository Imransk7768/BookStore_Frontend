import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Services/OrderServices/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderlist:any;

  constructor(private orderService:OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(){
    this.orderService.getOrders().subscribe((response: any) => {
      console.log("Got All Orders", response.data);
      this.orderlist = response.data;
    });
  }
  getShortDate(date:any){
    return date.split('T')[0]
  }
}
