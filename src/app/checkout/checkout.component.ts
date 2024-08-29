import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../ecomService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkOutStatus:boolean=false
  total:any= 0
  public payPalConfig ? : IPayPalConfig;

  constructor(private fb:FormBuilder, private api:ApiService,private router:Router){}

  checkOut=this.fb.group({
    fullName:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
    address:['',[Validators.required,Validators.pattern('[a-zA-Z 0-9,.]+')]],
    pin:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })

  cancel(){
    this.checkOut.reset()

  }
  proceedToBuy(){
    if(this.checkOut.valid){
      this.checkOutStatus=true
      if(localStorage.getItem("price")){
        this.total=JSON.parse(localStorage.getItem("price") || "")
      }
    }
    else{
        alert("invalid form")
    }

  }

  cancelPayment(){
    this.checkOutStatus=false
  }

  pay(){
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.total,
                }
              }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            //payment success
            this.api.emptyCartApi().subscribe({
              next:(result:any)=>{
                this.api.updateCartCount()
                alert("successfully completed payment!")
                this.checkOutStatus=false
                this.checkOut.reset()
                this.router.navigateByUrl("/")
              }
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            //payment cancel
            alert("transaction has been cancelled")

        },
        onError: err => {
            console.log('OnError', err);
            alert("transaction Failed ! Please try after some times..")

        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}

}
