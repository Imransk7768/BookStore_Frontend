import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  submitted=false;
  loginForm!: FormGroup;
  token:any;
  userId:any;
  SetValues:any;

  constructor(private formBuilder: FormBuilder,private user:UserService, private snackBar: MatSnackBar,private router:Router) { 
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit(){
    //this.getUserData()
    this.submitted = true;

    if(this.loginForm.valid){
      console.log("sign in Success");
      let payload={
        EmailId:this.loginForm.value.email,
        Password:this.loginForm.value.password
      }
      this.user.login(payload).subscribe((response:any)=>{
        console.log(response);
       console.log(response.data);
        localStorage.setItem("token",response.data)

        this.router.navigateByUrl('/dashboard/getallbooks')
      })
      let snackBarRef = this.snackBar.open('Login successfully','',{duration:2000});
    }
    else{
      console.log("not works");
    }
  }
  getUserData()
    {
        this.SetValues=this.SetValues.filter((response:any)=>{
          localStorage.setItem('userId',response.userId)
          localStorage.setItem('fullName',response.fullName)
          localStorage.setItem('mobileNumber',response.mobileNumber)
        })
    }
}
