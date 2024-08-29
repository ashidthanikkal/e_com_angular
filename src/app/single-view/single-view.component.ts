import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../ecomService/api.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {

  product:any={}

  constructor(private ar:ActivatedRoute, private service:ApiService,private router:Router){}

  ngOnInit(): void {

  this.ar.params.subscribe((data:any)=>{
    this.service.getSingleproductApi(data.id).subscribe({
      next:(result:any)=>{
        this.product=result
      },
      error:(data:any)=>{
        console.log(data.error);
        
      }
    })
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
          alert(result)
          this.service.updateCartCount()
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
