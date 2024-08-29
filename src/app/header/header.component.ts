import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ecomService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: any = true
  cartCount: any = 0
  searchData: any = ""

  constructor(private apiService: ApiService,private rout:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.login = false
      this.apiService.cartCount.subscribe({
        next: (result: any) => {
          this.cartCount = result
        }
      })
    }
    else {
      this.login = true
    }
  }

  updateData(event: any) {
    this.searchData = event.target.value
    this.apiService.searchData.next(this.searchData)

  }

  logout(){
    localStorage.removeItem("___paypal_storage__")
    localStorage.removeItem("price")
    localStorage.removeItem("token")
    this.apiService.cartCount.next(0)
    this.login=false
    this.rout.navigateByUrl("/")
  }
}
