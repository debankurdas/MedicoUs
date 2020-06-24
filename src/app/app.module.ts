import { VerifYEmailComponent } from './common/registration/verif-yemail/verif-yemail.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AuthInterceptorService } from './common/service/auth-interceptor.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './common/main-nav/main-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './common/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxStripeModule } from 'ngx-stripe';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatBadgeModule,
  MatGridListModule,
  MatCardModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatRadioModule} from '@angular/material';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ErrorComponent } from './common/error/error.component';
import { ErrorInterceptor } from './common/service/error-interceptor.service';
import { RegistrationComponent } from './common/registration/registration.component';
import { CategoryComponent } from './admin/category/category.component';
import { CategoryAddComponent } from './admin/category/category-add/category-add.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductAddComponent } from './admin/admin-product/product-add/product-add.component';
import { ProductListComponent } from './admin/admin-product/product-list/product-list.component';
import { ProductComponent } from './user/product/product.component';
import { ProductDetailsComponent } from './user/product/product-details/product-details.component';
import { ProductListsComponent } from './user/product/product-lists/product-lists.component';
import { WishListComponent } from './user/wish-list/wish-list.component';
import { CartListComponent } from './user/cart-list/cart-list.component';
import { PaymentComponent } from './user/payment/payment.component';
import { OrderComponent } from './user/order/order.component';
import { OrderDetailsComponent } from './user/order/order-details/order-details.component';
import { UserProfileEditComponent } from './user/user-profile/user-profile-edit/user-profile-edit.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ForgotpasswordComponent } from './common/forgotpassword/forgotpassword.component';
import { EmailSubmmitionComponent } from './common/forgotpassword/email-submmition/email-submmition.component';
import { RootAdminComponent } from './admin/root-admin/root-admin.component';
import { HospitalAdminComponent } from './admin/Hospital/hospital-admin/hospital-admin.component';
import { BedAddComponent } from './admin/Hospital/Bed/bed-add/bed-add.component';
import { BedViewComponent } from './admin/Hospital/Bed/bed-view/bed-view.component';
import { HospitalViewComponent } from './admin/Hospital/hospital-view/hospital-view.component';
import { HospitalAddComponent } from './admin/Hospital/hospital-add/hospital-add.component';
import { BloodBankViewComponent } from './admin/BloodBank/blood-bank-view/blood-bank-view.component';
import { BloodBankAdminComponent } from './admin/BloodBank/blood-bank-admin/blood-bank-admin.component';
import { BloodBankAddComponent } from './admin/BloodBank/blood-bank-add/blood-bank-add.component';
import { BloodGroupAddComponent } from './admin/BloodBank/BloodGroup/blood-group-add/blood-group-add.component';
import { BloodGroupViewComponent } from './admin/BloodBank/BloodGroup/blood-group-view/blood-group-view.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HospitalDashboardComponent } from './admin/Hospital/hospital-dashboard/hospital-dashboard.component';
import { BloodBankDashboardComponent } from './admin/BloodBank/blood-bank-dashboard/blood-bank-dashboard.component';
import { BranchComponent } from './admin/Hospital/hospital-dashboard/branch/branch.component';
import { ChartComponent } from './admin/Hospital/hospital-dashboard/chart/chart.component';
import { BloodBankBranchComponent } from './admin/BloodBank/blood-bank-dashboard/blood-bank-branch/blood-bank-branch.component';
import { BloodChartComponent } from './admin/BloodBank/blood-bank-dashboard/chart/chart.component';
import { StrideComponent } from './user/payment/stride/stride.component';
import { HospitalComponent } from './user/hospital/hospital.component';
import { NavbarHospComponent } from './user/hospital/navbar-hosp/navbar-hosp.component';
import { InvoiceComponent } from './user/order/invoice/invoice.component';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    DashboardComponent,
    UserDashboardComponent,
    UserProfileComponent,
    ErrorComponent,
    RegistrationComponent,
    CategoryComponent,
    CategoryAddComponent,
    CategoryListComponent,
    AdminProductComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductListsComponent,
    WishListComponent,
    CartListComponent,
    PaymentComponent,
    OrderComponent,
    OrderDetailsComponent,
    UserProfileEditComponent,
    OrdersComponent,
    VerifYEmailComponent,
    ForgotpasswordComponent,
    EmailSubmmitionComponent,
    RootAdminComponent,
    HospitalAdminComponent,
    BedAddComponent,
    BedViewComponent,
    HospitalViewComponent,
    HospitalAddComponent,
    BloodBankViewComponent,
    BloodBankAdminComponent,
    BloodBankAddComponent,
    BloodGroupAddComponent,
    BloodGroupViewComponent,
    IndexComponent,
    FooterComponent,
    HospitalDashboardComponent,
    BloodBankDashboardComponent,
    BranchComponent,
    ChartComponent,
    BloodBankBranchComponent,
    BloodChartComponent,
    StrideComponent,
    HospitalComponent,
    NavbarHospComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatBadgeModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPayPalModule,
    GoogleChartsModule,
    NgxStripeModule.forRoot('pk_test_jTsalbzdqlt6fKmlCGHhSM0z')
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
