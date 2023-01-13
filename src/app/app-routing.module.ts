import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DisplaybookComponent } from './Components/displaybook/displaybook.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { GetallbooksComponent } from './Components/getallbooks/getallbooks.component';
import { LoginComponent } from './Components/login/login.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { PlaceorderComponent } from './Components/placeorder/placeorder.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { SignupComponent } from './Components/signup/signup.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'register',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  
  {path:'dashboard',component:DashboardComponent,
  children:[
    {path: ' ', redirectTo:'dashboard',pathMatch:'full'},
    {path : 'getallbooks' , component:GetallbooksComponent},
    {path: 'displaybook',component:DisplaybookComponent},
    {path:'cart',component:CartComponent},
    {path:'wishlist',component:WishlistComponent},
    {path:'placeorder',component:PlaceorderComponent},
    {path:'orders',component:OrdersComponent},
    {path:'profile',component:ProfileComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
