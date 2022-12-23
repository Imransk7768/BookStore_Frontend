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

  constructor(private formBuilder: FormBuilder,private userservice:UserService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      let payload = {    
        FullName: this.signUpForm.value.fullName, // leftside firstname is exactly same as that of backend API and rightside firstname i.e., ,firstName should be exact same as that of formcontrolname in .html file or same as written above in ngonit 
        Email: this.signUpForm.value.email,
        Password: this.signUpForm.value.password,
        Mobile:Number(this.signUpForm.value.mobile),
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
