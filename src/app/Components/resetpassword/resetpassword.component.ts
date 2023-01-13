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
  this.token=localStorage.getItem('token');

  }
  get f() { return this.resetpasswordForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    if (this.resetpasswordForm.valid) {
      console.log("valid");
      let payload = {
          newpassword: this.resetpasswordForm.value.password,
          confirmpassword: this.resetpasswordForm.value.confirmpassword
      }
      this.user.resetpassword(payload,this.token).subscribe((response: any) => {
        console.log(response);
        console.log(response.data);
        console.log(" Password Reset Success", response)
      });
    }
  }
}
  // onSubmit() {
  //   this.submitted = true;
  
  //     if(this.resetpasswordForm.invalid){
  //       console.log("invalid");
      
  //       console.log(this.resetpasswordForm.value);
  //         let payload = {
  //           newPassword: this.resetpasswordForm.value.password,
  //           confirmPassword: this.resetpasswordForm.value.confirmpassword
  //         }

  //       this.user.resetpassword(payload,this.token).subscribe((response:any)=>{
  //         console.log(response);
  //         console.log(response.data);
  //     })
  //     let snackBarRef = this.snackBar.open('Password Reset Success','',{duration:2000});
  //   }
  // }
  // }

 