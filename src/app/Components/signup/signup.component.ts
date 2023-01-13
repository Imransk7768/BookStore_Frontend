import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  signUpForm!:FormGroup;
  submitted = false;
  fullName:any;

  constructor(private formBuilder: FormBuilder,private userservice:UserService, private snackBar:MatSnackBar) { 
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]]
    });
    this.fullName=localStorage.setItem('fullName',this.fullName)
  }
  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      let payload = {    
        FullName: this.signUpForm.value.fullName, // leftside firstname is exactly same as that of backend API and rightside firstname i.e., ,firstName should be exact same as that of formcontrolname in .html file or same as written above in ngonit 
        EmailId: this.signUpForm.value.emailId,
        Password: this.signUpForm.value.password,
        MobileNumber:Number(this.signUpForm.value.mobileNumber),
      }
      this.userservice.register(payload).subscribe((response: any) => {    
      console.log(response);
      localStorage.setItem("token",response.data)
      })
    }
    let snackBarRef = this.snackBar.open('Registered successfully','',{duration:2000});
  }
  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
}
