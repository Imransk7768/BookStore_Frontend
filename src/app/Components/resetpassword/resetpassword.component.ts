import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  
  resetpasswordForm! : FormGroup;
  hide=true;
  submitted = false;
  token:any;

  constructor(private formBuilder: FormBuilder,private user:UserService, private router:Router, private activeRoute:ActivatedRoute,private snackBar:MatSnackBar) { }

  ngOnInit(): void { 
    this.resetpasswordForm = this.formBuilder.group
    ({
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
      
  } );
  //this.token = this.activeRoute.snapshot.paramMap.get('token');
  }
  get f() { return this.resetpasswordForm.controls; }
  
  onSubmit() {
    this.submitted = true;
  
    if (this.resetpasswordForm.valid) {
      let payload = {
        newPassword: this.resetpasswordForm.value.password,
        confirmPassword: this.resetpasswordForm.value.confirmpassword,
      }
     
       this.user.resetPassword(payload,this.token).subscribe((response:any)=>{
        console.log(response)
        //localStorage.getItem('token')
        //this.router.navigateByUrl('login')
      })
      let snackBarRef = this.snackBar.open('Password Reset Success','',{duration:2000});
    }
    
  }
  }
