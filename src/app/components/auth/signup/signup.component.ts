import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.style.scss']
})
export class SignupComponent implements OnInit {
  
  public signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router, private authService: AuthService){}

  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
          email:['', [Validators.required]],
          password:['', [Validators.required, Validators.min(8)]]
      })
  }

  public signup(): void{
      this.authService.login(this.signupForm.value)
      .subscribe(res => {
          alert('Singup successfull');
          this.signupForm.reset();
          this.router.navigate(['login']);
      }, err =>{
          alert('Invalid username or password');
      })
  }
}
