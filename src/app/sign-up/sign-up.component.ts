import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../ecomService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private fb:FormBuilder, private service:ApiService,private router:Router){}

  signupForm=this.fb.group({
    username:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
    email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')]]
  })

  register(){
    if(this.signupForm.valid){
      var path=this.signupForm.value
      var bodyData={
        username:path.username,email:path.email,password:path.password
      }
      this.service.registerApi(bodyData).subscribe({
        next:(result:any)=>{
          // console.log(result);
          alert(`${result.username} register successfully`)
          this.signupForm.reset()
          this.router.navigateByUrl('/login')
        },
        error:(result:any)=>{
          alert(result.error)
        }
      })

    }
    else{
      alert('invalid form')
    }
  }

}
