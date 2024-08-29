import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ecomService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service:ApiService, private router:Router){}

  cartItems:any=[]
  totalPrice:any=0
  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.service.getCartApi().subscribe({
      next:(result:any)=>{
        this.cartItems=result
        console.log(this.cartItems);
        this.findTotalPrice()
        
      },
      error:(result:any)=>{
        console.log(result.error);
      }
    })
  }

  findTotalPrice(){
    if(this.cartItems.length>0){
      this.totalPrice=Math.ceil(this.cartItems.map((i:any)=>i.grandTotal)
    .reduce((a:any,b:any)=>a+b))
    console.log(this.totalPrice);
    }
    else{
      this.totalPrice=0
    }
  }
  checkoutPage(){
    localStorage.setItem("price",JSON.stringify(this.totalPrice))
    this.router.navigateByUrl("/checkout")
  }


  removeCart(id:any){
    this.service.removeCartApi(id).subscribe({
      next:(result:any)=>{
        this.getCart()
        this.service.updateCartCount()
      },
      error:(result:any)=>{
        console.log(result.error);
      }
    })

  }

  increment(id:any){
    this.service.incrementCartApi(id).subscribe({
      next:(result:any)=>{
        this.getCart()
      }
    })
  }

  decrement(id:any){
    this.service.decrementCartApi(id).subscribe({
      next:(result:any)=>{
        this.getCart()
        this.service.updateCartCount()
      }
    })
  }


}
