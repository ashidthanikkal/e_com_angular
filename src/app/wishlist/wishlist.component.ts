import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ecomService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private service:ApiService,private router:Router){}

  wishlistItems:any=[]
  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.service.getWishlistApi().subscribe({
      next:(result:any)=>{
        this.wishlistItems=result
        console.log(this.wishlistItems);
        
      },
      error:(result:any)=>{
        console.log(result.error);
        
      }
    })
  }

  removeWishlist(id:any){
    this.service.removeWishlistApi(id).subscribe({
      next:(result:any)=>{
        this.getWishlist()
      },
      error:(result:any)=>{
        console.log(result.error);
      }
    })

  }

  addToCart(product:any){
    if(localStorage.getItem("token")){
      //body
      Object.assign(product,{quantity:1})
      this.service.addToCartApi(product)
      .subscribe({
        next:(result:any)=>{
          this.service.updateCartCount()
          console.log(result);
          this.removeWishlist(product._id)
        },
        error:(result:any)=>{
          console.log(result.error);
        }
      })
    }
    else{
      alert("please login to add items in cart")
      this.router.navigateByUrl('/login')
    }


  }

}
