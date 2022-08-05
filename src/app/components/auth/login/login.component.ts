import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth.style.scss'],

})

export class LoginComponent implements OnInit{
    public loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private router: Router, private authService : AuthService){}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email:['', Validators.required],
            password:['',Validators.required]
        })
    }

    public login(): void {
        this.authService.login(this.loginForm.value).subscribe(res => {
            alert('Login successfull');
            this.loginForm.reset();
            this.router.navigate(['formbuilder']);
        }, err =>{
            alert('Invalid username or password');
        })
    }

}
