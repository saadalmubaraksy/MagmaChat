import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { ParentErrorStateMatcher, PasswordValidator } from './password.validator';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {

    accountDetailsForm: FormGroup;
    matching_passwords_group: FormGroup;

     parentErrorStateMatcher = new ParentErrorStateMatcher();

     constructor(private fb: FormBuilder,private authService:AuthService,private route : Router) { }

  ngOnInit() {
    this.createForms();
  }
  
  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)
      ])),
      password_confirmation: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      name: new FormControl('', Validators.compose([  
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
    })

  }

  onSubmitAccountDetails(){debugger
    let userToSubmit = {
      name:this.accountDetailsForm.get("name").value,
      email:this.accountDetailsForm.get("email").value,
      password:this.accountDetailsForm.get('matching_passwords').get('password').value,
      password_confirmation:this.accountDetailsForm.get('matching_passwords').get('password_confirmation').value,
    }
    this.authService.signupUser(userToSubmit).subscribe(data=>{
      console.log("success");
      this.route.navigate(["login"]);
    })
  }

  //#region validation
  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase,one special charecter, and one number' }
    ],       
  }
  //#endregion
   
}
