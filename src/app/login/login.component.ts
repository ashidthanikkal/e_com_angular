import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../ecomService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder, private service:ApiService,private rout:Router){}

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')]]
  })

  login(){
    if(this.loginForm.valid){
      var bodyData={email:this.loginForm.value.email,password:this.loginForm.value.password}
      this.service.loginApi(bodyData).subscribe({
      next:(result:any)=>{
        // console.log(result);
        localStorage.setItem("token",result.token)
        alert(`${result.user.username} login successfully`)
        this.loginForm.reset()
        this.rout.navigateByUrl("/")

      },
      error:(result:any)=>{
        alert(result.error);
      }
        
      })
    }
    else{
      alert('invalid form')
    }
  }

}
