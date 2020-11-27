import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    accountDetailsForm: FormGroup;
    
    constructor(private fb: FormBuilder,private authService:AuthService,private router: Router,
        private route: ActivatedRoute) { }

    // On submit button click
    onSubmit() {
    }
    ngOnInit() {
        if(this.authService.isAuthenticated()){
            this.router.navigate(["/dashboard/dashboard1"]);
        }
        this.createForms();
      }
      
      createForms() {
       
        // user links form validations
        this.accountDetailsForm = this.fb.group({
          password: new FormControl('', Validators.compose([  
           Validators.required
          ])),
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])),
        })
    
      }
    
      onSubmitAccountDetails(){debugger      
        this.authService.signinUser(this.accountDetailsForm.value).subscribe(data=>{

          console.log("success");

          localStorage.setItem("token",data["token"]);
          localStorage.setItem("user_type",data["user_type"]);
          localStorage.setItem("user_id",data["user_id"]);
          localStorage.setItem("username",this.accountDetailsForm.value["name"]);

          this.router.navigate(["/dashboard/dashboard1"]);
        }),
        error =>{
            return;
        }
      }
    // On registration link click
    onRegister() {
        this.router.navigate(['/register']);
    }
}
