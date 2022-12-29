import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DisplaybookComponent } from './Components/displaybook/displaybook.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { GetallbooksComponent } from './Components/getallbooks/getallbooks.component';
import { LoginComponent } from './Components/login/login.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { SignupComponent } from './Components/signup/signup.component';

const routes: Routes = [
  {path:'register',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  {path: 'displaybook',component:DisplaybookComponent},
  {path:'dashboard',component:DashboardComponent,
  children:[
    {path: ' ', redirectTo:'dashboard',pathMatch:'full'},
    {path : 'getallbooks' , component:GetallbooksComponent},
    //{path: 'displaybook',component:DisplaybookComponent},
  ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
