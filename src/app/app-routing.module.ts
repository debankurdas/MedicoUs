import { UserProfileEditComponent } from './user/user-profile/user-profile-edit/user-profile-edit.component';
import { ProductAddComponent } from './admin/admin-product/product-add/product-add.component';
import { ProductListComponent } from './admin/admin-product/product-list/product-list.component';
import { OrderDetailsComponent } from './user/order/order-details/order-details.component';
import { PaymentComponent } from './user/payment/payment.component';
import { OrderComponent } from './user/order/order.component';
import { CartListComponent } from './user/cart-list/cart-list.component';
import { WishListComponent } from './user/wish-list/wish-list.component';
import { CategoryComponent } from './admin/category/category.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AdminGuard } from './admin/guard/admin.guard';
import { UserGuard } from './user/guard/user.guard';
import { AuthGuard } from './common/auth.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { LoginComponent } from './common/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './user/product/product.component';
import { ProductDetailsComponent } from './user/product/product-details/product-details.component';


const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/dashboard', component: UserDashboardComponent, canActivate: [AuthGuard, UserGuard]},
  {path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard, UserGuard]},
  {path: 'Admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/Category', component: CategoryComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/product', component: ProductListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/product/create', component: ProductAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'edit/:productId', component: ProductAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'userprofile/edit/:userId', component: UserProfileEditComponent, canActivate: [AuthGuard, UserGuard]},
  { path: 'user/product', component: ProductComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/wishList', component: WishListComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/cartList', component: CartListComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/orders', component: OrderComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/payment', component: PaymentComponent, canActivate: [AuthGuard, UserGuard] },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard, UserGuard]
})
export class AppRoutingModule { }
