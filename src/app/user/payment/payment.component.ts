import { Subscription } from 'rxjs';
import { UserProfileService } from './../user-profile/service/user-profile.service';
// import { environment } from 'src/environments/environment';
import { UserOrderService } from './../order/service/user-order.service';
import { CartListService } from './../../common/service/cart-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {PayPalConfig, PayPalIntegrationType, PayPalEnvironment, } from 'ngx-paypal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USER } from 'src/app/admin/model/model';
import { PaymentService } from './service/payment-service.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  products = [];
  id = 1;
  idForProduct: number;
  cartIdArray = [];
  total: number;
  email: any;
  mobile: any;
  userDataObserver: Subscription;
  shippingAddress: FormGroup;
  // displayedColumns: string[] = ['imageUrl', 'productName', 'quantity', 'price', 'total'];
  public payPalConfig?: PayPalConfig;
  UserDatas: USER[];
  cartCount: number;
  constructor(private cartService: CartListService,
              private orderService: UserOrderService,
              private fb: FormBuilder,
              private router: Router,
              private profileService: UserProfileService,
              private paymentService: PaymentService) { }

//start
countryList: Array<any> = [
  { name: ' -- select an option -- ', cities: ['-- select an option --'] },
  { name: 'Andhra Pradesh',
  cities: ['Anantapur' , 'Chittoor' , 'East Godavari' , 'Guntur' , 'YSR Kadapa' , 'Krishna' ,
  'Kurnool' , 'Nellore' , 'Prakasam' , 'Srikakulam' , 'Visakhapatnam' , 'Vizianagaram', 'West Godavari'] },
  { name: 'Arunachal Pradesh', cities: ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey',
  'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Central Siang', 'Upper Siang',
  'Lower Dibang Valley', 'Upper Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding'] },
  { name: 'Assam', cities: ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang',
  'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat',
  'Kamrup', 'Karbi', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar',
  'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi'] },
  { name: 'Bihar', cities: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur',
  'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Khagaria', 'Kishanganj',
   'Kaimur', 'Katihar', 'Lakhisarai', 'Madhubani', 'Munger', 'Madhepura', 'Muzaffarpur', 'Nalanda', 'Nawada',
    'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Sheohar', 'Sheikhpura', 'Saran', 'Sitamarhi',
     'Supaul', 'Siwan', 'Vaishali' , 'West Champaran'] },
  { name: 'Chhattisgarh', cities: ['Balod', 'Balrampur', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada',
   'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham',
   'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur',
   'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'] },
  { name: 'Dadra Nagar Haveli and Daman Diu', cities: ['  Daman district', 'Diu district', 'Dadra and Nagar Haveli district'] },
  { name: 'Delhi', cities: ['New Delhi', 'North Delhi', 'North West Delhi', 'West Delhi', 'South West Delhi',
   'South Delhi ', 'South East Delhi', 'Central Delhi', 'North East Delhi', 'Shahdara', 'East Delhi'] },
  { name: 'Goa', cities: ['North Goa', 'South Goa'] },
  { name: 'Gujarat', cities: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
   'Bhavnagar', 'Botad' , 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi', 'Gandhinagar', 'Gir Somnath',
    'Jamnagar', 'Junagadh', 'Kutch', 'Kheda', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari',
     'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'] },
  { name: 'Haryana', cities: ['Ambala', 'Bhiwani', 'Charkhi', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar',
   'Jhajjar', 'Jind', 'Kaithal'  , 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula',
    'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'] },
  { name: 'Himachal Pradesh', cities: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu',
   'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'] },
  { name: 'Jammu and Kashmir', cities: ['Doda District', 'Jammu District', 'Kathua District',
  'Kishtwar District', 'Poonch District', 'Rajouri District', 'Ramban District', 'Reasi District',
  'Samba District', 'Udhampur District', 'Anantnag District', 'Bandipora District', 'Baramulla district',
   'Budgam District', 'Ganderbal District', 'Kulgam District', 'Kupwara District', 'Pulwama District',
    'Shopian District', 'Srinagar District'] },
  { name: 'Karnataka', cities: ['Bagalkote', 'Belgaum', 'Bijapur', 'Dharwad', 'Gadag', 'Haveri',
   'Uttara Kannada', 'Shimoga', 'Bangalore Rural', 'Ramanagara', 'Chikkaballapura', 'Chitradurga',
    'Davanagere', 'Kolar', 'Bangalore Urban', 'Tumakuru', 'Ballari', 'Bidar', 'Gulbarga', 'Koppala',
    'Raichuru', 'Yadagiri', 'Chamarajanagara', 'Chikkamagaluru', 'Dakshina Kannada', 'Hassan', 'Kodagu', 'Mandya', 'Mysore', 'Udupi'] },
  { name: 'Kerala', cities: ['Thiruvananthapuram', 'Kollam', 'Alappuzha', 'Pathanamthitta', 'Kottayam',
   'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'] },
  { name: 'Ladakh', cities: ['Kargil District', 'Leh District'] },
  { name: 'Madhya Pradesh', cities: ['AGAR-MALWA', 'Alirajpur', 'Anuppur', 'Ashok Nagar', 'Balaghat',
  'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia',
   'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua',
    'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari',
     'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol',
     'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrouli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'] },
  { name: 'Maharashtra', cities: ['Akola', 'Amravati', 'Buldana', 'Yavatmal', 'Washim', 'Amravati',
   'Aurangabad', 'Marathwada', 'Beed', 'Jalna', 'Osmanabad', 'Nanded', 'Latur', 'Parbhani', 'Hingoli',
   'Aurangabad', 'Konkan', 'Mumbai City', 'Mumbai Suburban', 'Thane', 'Palghar', 'Raigad', 'Ratnagiri',
    'Sindhudurg', 'Nagpur', 'Vidarbha', 'Bhandara', 'Chandrapur', 'Gadchiroli', 'Gondia', 'Wardha',
    'Nagpur', 'Nashik Division', 'Khandesh', 'Dhule', 'Jalgaon', 'Nandurbar', 'Pune', 'Paschim Maharashtra',
    'Kolhapur', 'Pune', 'Sangli', 'Satara', 'Solapur', 'Ahmednagar'
] },
  { name: 'Manipur', cities: ['Bishnupur', 'Thoubal', 'Imphal East', 'Imphal West', 'Senapati', 'Ukhrul',
  'Chandel', 'Churachandpur', 'Tamenglong', 'Jiribam', 'Kangpokpi', 'Kakching', 'Tengnoupal', 'Kamjong', 'Noney', 'Pherzawl'] },
  { name: 'Meghalaya', cities: ['West Jaintia Hills (Jowai)', 'East Jaintia Hills (Khliehriat)',
  'East Khasi Hills (Shillong)', 'West Khasi Hills (Nongstoin)', 'South West Khasi Hills (Mawkyrwat)',
   'Ri-Bhoi (Nongpoh)', 'North Garo Hills (Resubelpara)', 'East Garo Hills (Williamnagar)',
    'South Garo Hills (Baghmara)', 'West Garo Hills (Tura)', 'South West Garo Hills (Ampati)'] },
  { name: 'Mizoram', cities: ['Aizawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip', 'Champhai'] },
  { name: 'Puducherry', cities: ['Karaikal district', 'Mahé district', 'Puducherry district', 'Yanam district'] },
  { name: 'Nagaland', cities: ['Dimapur district', 'Kiphire district', 'Kohima district', 'Longleng district',
   'Mokokchung district', 'Mon District', 'Peren district', 'Phek district', 'Tuensang district',
    'Wokha district', 'Zunheboto district', 'Noklak district'] },
  { name: 'Odisha', cities: ['Angul', ' Balangir', ' Balasore', ' Bargarh', ' Bhadrak', ' Boudh',
  ' Cuttack', ' Deogarh', ' Dhenkanal', ' Gajapati', ' Ganjam', ' Jagatsinghpur', ' Jajpur', ' Jharsuguda',
  ' Kandhamal', ' Kalahandi', ' Kendrapara', ' Keonjhar', ' Khordha', ' Koraput', ' Malkangiri', ' Mayurbhanj',
   ' Nabarangpur', ' Nayagarh', ' Nuapada', ' Puri', ' Rayagada', ' Sambalpur', ' Subarnapur', ' Sundargarh'] },
  { name: 'Punjab', cities: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Firozpur',
   'Fazilka', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana ', 'Mansa', 'Moga',
   'Sri Muktsar Sahib', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur',
   'Shahid Bhagat Singh Nagar', 'Taran Taran'] },
  { name: 'Rajasthan', cities: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur',
   'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh   Chittorgarh', 'Churu', 'Dausa', 'Dholpur',
   'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalor ', 'Jhalawar', 'Jhun', 'Jodhpur',
    'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand   Rajsamand', 'Sawai Madhopur',
    'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur', 'Rajasthan'] },
  { name: 'Sikkim', cities: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'] },
  { name: 'Tamil Nadu', cities: ['Ariyalu', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
   'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri',
   'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
   'Ramanathapuram', 'Ranipet', 'Salem ', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi',
    'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
    'Vellore', 'Viluppuram', 'Virudhunagar'] },
  { name: 'Telangana', cities: ['Adilabad', 'Komaram Bheem', 'Bhadradri', 'Hyderabad', 'Jagtial', 'Jangaon',
  'Jayashankar', 'Jogulamba', 'Kamareddy', 'Karimnagar', 'Khammam', 'Mahabubabad', 'Mahbubnagar',
  'Mancherial', 'Medak', 'Medchal–Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanapet',
  'Nirmal', 'Nizamabad', 'Peddapalli ', 'Rajanna Sircilla', 'Ranga Reddy', 'Sangareddy', 'Siddipet',
   'Suryapet', 'Vikarabad', 'Wanaparthy Warangal (Rural)', 'Warangal (Urban)', 'Yadadri'] },
  { name: 'Tripura', cities: ['Dhalai', 'Sipahijala', 'Khowai', 'Gomati', 'Unakoti', 'North Tripura', 'South Tripura', 'West Tripura'] },
  { name: 'Uttar Pradesh', cities: ['Agra', 'Aligarh', 'PrayagRaj', 'Ambedkar Nagar', 'Amroha', 'Auraiya',
  'Azamgarh', 'Badaun', 'Bahraich', 'Ballia', 'Balrampur', 'Banda District', 'Barabanki', 'Bareilly',
  'Basti', 'Bijnor', 'Bulandshahr', 'Chandauli(Varanasi Dehat)', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah',
   'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam', 'Ghaziabad', 'Ghazipur', 'Gonda',
   'Gorakhpur', 'Hamirpur', 'Hapur District', 'Hard', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri',
    'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur',
    'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae Bareli', 'Rampur', 'Saharanpur',
     'Sant Kabir Nagar', 'Sant Ravidas Nagar', 'Sambhal', 'Shahjahanpur', 'Shamli', 'Shravasti',
      'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi (Kashi)', 'Allahabad', 'Amethi', 'Bagpat'] },
  { name: 'Uttarakhand', cities: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar',
   'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'] },
  { name: 'West Bengal', cities: ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
  'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad',
   'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia',
    'South 24 Parganas', 'Uttar Dinajpur'] },
  { name: 'Andaman and Nicobar Islands', cities: ['Nicobar', 'North and Middle Andaman', 'South Andaman'] }
];
cities: Array<any>;
//end
  ngOnInit() {

    this.shippingAddress = this.fb.group({
      userName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
      //add city
    });
    this.cartService.getProductForCheckOut().subscribe((productList) => {
      if ( productList.length > 0) {
        this.idForProduct = 12;
        this.products = productList;
      }
      this.total = productList.map(p => p.quantity * p.price).reduce((total: any, price: any) =>
        total + price, 0
      );
    });
    this.profileService.getProfile();
    this.userDataObserver = this.profileService.getuserUpdateListner()
    .subscribe((userDatas: { user: USER[]}) => {
      this.UserDatas = userDatas.user;
      console.log(this.UserDatas);
      this.email = this.UserDatas[4];
      this.mobile = this.UserDatas[3];
    });
    this.cartService.getcartIdForCheckOut().subscribe((cartId) => {
      this.cartIdArray = cartId;
    });
    this.getCartList();
    // this.initConfig();
  }
  changeCountry($event, count: any) {
    console.log(count.name);
    this.cities = this.countryList.find(con => con.name === count.name).cities;
  }
  placeOrder() {

    const paymentDatas = {
      paymentToken: 'done'
    };
    const orders = {
      products: this.products,
      shippingAddress: this.shippingAddress.getRawValue(),
      paymentInfo: paymentDatas,
      emailAddress: this.email,
      mobile: this.mobile,
      total: this.total
    };
    this.cartIdArray.forEach((cart: any) => {
      this.cartService.deleteProduct(cart)
      .subscribe((message) => {
        console.log(message.message);
      });
    });
    this.orderService.placeOrder(orders).subscribe((result) => {
      this.router.navigate(['/user/orders']);
    });
  }

  placeOrderwithCard() {
    const paymentData = {
      paymentToken: 'done'
    };
    const order = {
      products: this.products,
      shippingAddress: this.shippingAddress.getRawValue(),
      paymentInfo: paymentData,
      emailAddress: this.email,
      mobile: this.mobile,
      total: this.total
    };
    this.cartIdArray.forEach((cart: any) => {
      this.cartService.deleteProduct(cart)
      .subscribe((message) => {
        console.log(message.message);
      });
    });
    console.log(order);
    this.paymentService.addOrder(order);
    this.router.navigate(['/user/payWithCard']);
  }

  getCartList() {
    this.cartService.getcartList()
    .subscribe((result) => {
      if (result.status === 'Success') {
        this.cartCount = result.data.length;

      }
    });
  }

  idChangeforPay() {
  this.id = 1;
  }
  idChange() {
    this.id = 0;
  }
   ngOnDestroy() {
     this.userDataObserver.unsubscribe();
   }

}
