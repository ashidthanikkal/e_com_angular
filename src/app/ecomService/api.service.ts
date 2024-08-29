import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url = 'https://e-com-server-1-qx68.onrender.com'

  //create an object of behaviour subject
  cartCount = new BehaviorSubject(0)
  searchData = new BehaviorSubject("")

  constructor(private http: HttpClient) {
    this.updateCartCount()
  }

  //method to update cart component
  updateCartCount() {
    this.getCartApi().subscribe({
      next: (result: any) => {
        //update
        this.cartCount.next(result.length)
      }
    })
  }


  getProductApi(sData:any) {
    return this.http.get(`${this.base_url}/get-products?search=${sData}`)
  }

  getSingleproductApi(id: any) {
    return this.http.get(`${this.base_url}/get-single-products/${id}`)
  }

  registerApi(bodyData: any) {
    return this.http.post(`${this.base_url}/register`, bodyData)
  }

  loginApi(bodyData: any) {
    return this.http.post(`${this.base_url}/login`, bodyData)
  }

  //accessHeader

  tokenHeader() {
    var headers = new HttpHeaders()
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")
      var headers = headers.append("access_token", `Bearer ${token}`)
    }
    //{headers:headers}
    return { headers }
  }

  //add to wishlist api

  addToWishlistApi(bodyData: any) {
    return this.http.post(`${this.base_url}/add-to-wishlist`, bodyData, this.tokenHeader())
  }

  //getwishlistapi
  getWishlistApi() {
    return this.http.get(`${this.base_url}/get-user-wishlist`, this.tokenHeader())
  }

  //remove wishlist item

  removeWishlistApi(id: any) {
    return this.http.delete(`${this.base_url}/remove-wishlist-item/${id}`, this.tokenHeader())
  }

  //add to Cart
  addToCartApi(bodyData: any) {
    return this.http.post(`${this.base_url}/add-to-cart`, bodyData, this.tokenHeader())
  }

  //get cart Api
  getCartApi() {
    return this.http.get(`${this.base_url}/get-user-cart`, this.tokenHeader())
  }

  //remove cart item

  removeCartApi(id: any) {
    return this.http.delete(`${this.base_url}/remove-cart-item/${id}`, this.tokenHeader())
  }

  //increment cart item
  incrementCartApi(id: any) {
    return this.http.get(`${this.base_url}/increment-cart/${id}`, this.tokenHeader())
  }
  //decrement cart item
  decrementCartApi(id: any) {
    return this.http.get(`${this.base_url}/decrement-cart/${id}`, this.tokenHeader())
  }

  //empty cart

  emptyCartApi(){
    return this.http.delete(`${this.base_url}/empty-cart`,this.tokenHeader())
  }

}
