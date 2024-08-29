import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ecomService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  allProducts:any=[]

  constructor(private service:ApiService,private router:Router){}

  ngOnInit(): void {
    this.service.searchData.subscribe({
      next:(result:any)=>{
        this.service.getProductApi(result).subscribe({
          next:(result:any)=>{
            this.allProducts=result
            console.log(this.allProducts);
          },
          error:(error:any)=>{
            console.log(error.error);
          }
        })
    
        
      }
    })
    
  }

  addToWishlist(product:any){
    if(localStorage.getItem("token")){
      var bodyData={
        id:product.id,
        title:product.title,
        price:product.price,
        description:product.description,
        category:product.category,
        image:product.image,
        rating:product.rating
      }
      this.service.addToWishlistApi(bodyData)
      .subscribe({
        next:(result:any)=>{
          console.log(result);
        },
        error:(result:any)=>{
          console.log(result.error);
        }
      })
    }
    else{
      alert("please login to add items in wishlist")
      this.router.navigateByUrl('/login')
    }
  }

  addToCart(product:any){

    if(localStorage.getItem("token")){
      //body
      Object.assign(product,{quantity:1})
      this.service.addToCartApi(product)
      .subscribe({
        next:(result:any)=>{
          this.service.updateCartCount()
          alert(result)
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
