import { BloodBankDashboardComponent } from './admin/BloodBank/blood-bank-dashboard/blood-bank-dashboard.component';
import { HospitalDashboardComponent } from './admin/Hospital/hospital-dashboard/hospital-dashboard.component';
import { IndexComponent } from './index/index.component';
import { BloodGroupViewComponent } from './admin/BloodBank/BloodGroup/blood-group-view/blood-group-view.component';
import { BloodGroupAddComponent } from './admin/BloodBank/BloodGroup/blood-group-add/blood-group-add.component';
import { BloodBankViewComponent } from './admin/BloodBank/blood-bank-view/blood-bank-view.component';
import { BloodBankAddComponent } from './admin/BloodBank/blood-bank-add/blood-bank-add.component';
import { BloodBankAdminComponent } from './admin/BloodBank/blood-bank-admin/blood-bank-admin.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { HospitalViewComponent } from './admin/Hospital/hospital-view/hospital-view.component';
import { HospitalAddComponent } from './admin/Hospital/hospital-add/hospital-add.component';
import { BedViewComponent } from './admin/Hospital/Bed/bed-view/bed-view.component';
import { BedAddComponent } from './admin/Hospital/Bed/bed-add/bed-add.component';
import { HospitalAdminComponent } from './admin/Hospital/hospital-admin/hospital-admin.component';
import { RootAdminComponent } from './admin/root-admin/root-admin.component';
import { ForgotpasswordComponent } from './common/forgotpassword/forgotpassword.component';
import { EmailSubmmitionComponent } from './common/forgotpassword/email-submmition/email-submmition.component';
import { VerifYEmailComponent } from './common/registration/verif-yemail/verif-yemail.component';
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
import { StrideComponent } from './user/payment/stride/stride.component';
import { HospViewComponent } from './user/hospital/hosp-view/hosp-view.component';


const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'index', component: IndexComponent},
  {path: 'verifyMail', component: VerifYEmailComponent},
  {path: 'emailSubmit', component: EmailSubmmitionComponent},
  {path: 'forgotPassword', component: ForgotpasswordComponent},
  {path: 'user/dashboard', component: UserDashboardComponent, canActivate: [AuthGuard, UserGuard]},
  {path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard, UserGuard]},
  {path: 'Admin/Medicine_dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/Hospital', component: HospitalAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/HospitalDashboard', component: HospitalDashboardComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/HospitalBranchAdd', component: HospitalAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/HospitalBranchView', component: HospitalViewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/HospitalBranch/edit/:hospitalId', component: HospitalAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/Bed/BedAdd/:hospitalId', component: BedAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BedEdit/:bedId', component: BedAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/Bed/BedView/:hospitalId', component: BedViewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodBankDashboard', component: BloodBankDashboardComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodBank', component: BloodBankAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodBankAdd', component: BloodBankAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodBankView', component: BloodBankViewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodBank/edit/:bloodBankId', component: BloodBankAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodGroup/BloodGroupAdd/:bloodBankId', component: BloodGroupAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodGroupEdit/:bloodGroupId', component: BloodGroupAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/BloodGroup/BloodGroupView/:bloodBankId', component: BloodGroupViewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/Root', component: RootAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/Category', component: CategoryComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/product', component: ProductListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/product/create', component: ProductAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'Admin/order', component: OrdersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'edit/:productId', component: ProductAddComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'userprofile/edit/:userId', component: UserProfileEditComponent, canActivate: [AuthGuard, UserGuard]},
  { path: 'user/product', component: ProductComponent},
  { path: 'user/product/:id', component: ProductDetailsComponent},
  { path: 'user/wishList', component: WishListComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/cartList', component: CartListComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/orders', component: OrderComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/orderDetails', component: OrderDetailsComponent},
  {path: 'user/payWithCard', component: StrideComponent, canActivate: [AuthGuard, UserGuard]},
  { path: 'user/payment', component: PaymentComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/hospital', component: HospViewComponent, canActivate: [AuthGuard, UserGuard] },
  {path: '', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard, UserGuard]
})
export class AppRoutingModule { }
