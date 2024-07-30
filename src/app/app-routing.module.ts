import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { single } from 'rxjs';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignUpComponent},
  {path:"single-view/:id",component:SingleViewComponent},
  {path:"cart",component:CartComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"wishlist",component:WishlistComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
