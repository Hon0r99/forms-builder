import { AuthService } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router:Router, private authService: AuthService){}


  ngOnInit():void {
      this.signupForm = this.formBuilder.group({
          email:['', [Validators.required]],
          password:['', [Validators.required, Validators.min(8)]]
      })
  }

  signup():void{
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
