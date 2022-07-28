import { ConditionalExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm:FormGroup;
  getData:any;

  getId:any;
  

  constructor(
    public fb:FormBuilder,
    public loginService:LoginService,
    public router:Router,
    public activeRoute:ActivatedRoute
  ) { 
    this.loginForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

get email(){return this.loginForm.get('email');}
get password(){return this.loginForm.get('password');}

  userLogin()
  {
    this.loginService.userLogin(this.loginForm.value).subscribe(data=>{
      this.loginService.setToken(data['token']);
      console.log(this.getId)
       this.router.navigateByUrl(`/dashboard`)
      })
  }



  
  ngOnInit(): void {
    
  }

}
