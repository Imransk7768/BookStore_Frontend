import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userServices/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  forgotPasswordForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private user:UserService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      let reqData = {
        Email: this.forgotPasswordForm.value.email,
      }
      this.user.forgetpassword(reqData).subscribe((response: any) => {
        console.log(response);
        console.log("Reset link sent to mail success", response)
        localStorage.setItem('token',response.data);
      });
    }
  }

}