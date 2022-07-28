import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Login} from '../../models/login';
import {LoginService} from '../../services/login.service';


@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {
  getData:Login[]=[];
  loginForm:FormGroup;

  constructor(
    private loginService:LoginService,
    private fb:FormBuilder,
    private router:Router
  ) { 
    this.loginForm=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  get name(){return this.loginForm.get('name')}
  get email(){return this.loginForm.get('email');}
  get password(){return this.loginForm.get('password');}

  //Register
  register(){
    console.log(this.loginForm.value)
    this.loginService.userRegister(this.loginForm.value).subscribe(data=>{
      console.log(data)
      this.router.navigateByUrl('/login')
    })
  }

  ngOnInit(): void {
  }

}
