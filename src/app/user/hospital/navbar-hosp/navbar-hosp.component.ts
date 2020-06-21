import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-navbar-hosp',
  templateUrl: './navbar-hosp.component.html',
  styleUrls: ['./navbar-hosp.component.css']
})
export class NavbarHospComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      area : new FormControl('', Validators.required),
    });
    this.form1 = this.fb.group({
      state: new FormControl('', Validators.required),
      speciality: new FormControl('', Validators.required),
    });
  }

  countryList: Array<any> = [
    { name: ' -- select an option -- ', cities: ['-- select an option --'] },

    { name: 'Andhra Pradesh',
    cities: ['All', 'Anantapur' , 'Chittoor' , 'East Godavari' , 'Guntur' , 'YSR Kadapa' , 'Krishna' ,
    'Kurnool' , 'Nellore' , 'Prakasam' , 'Srikakulam' , 'Visakhapatnam' , 'Vizianagaram', 'West Godavari'] },
    { name: 'Arunachal Pradesh', cities: ['All', 'Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey',
    'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Central Siang', 'Upper Siang',
    'Lower Dibang Valley', 'Upper Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding'] },
    { name: 'Assam', cities: ['All', 'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang',
    'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat',
    'Kamrup', 'Karbi', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar',
    'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi'] },

    // tslint:disable-next-line:whitespace
    { name: 'Bihar', cities: ['All','Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur',
    'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Khagaria', 'Kishanganj',
     'Kaimur', 'Katihar', 'Lakhisarai', 'Madhubani', 'Munger', 'Madhepura', 'Muzaffarpur', 'Nalanda', 'Nawada',
      'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Sheohar', 'Sheikhpura', 'Saran', 'Sitamarhi',
       'Supaul', 'Siwan', 'Vaishali' , 'West Champaran'] },
    // tslint:disable-next-line:whitespace
    { name: 'Chhattisgarh', cities: ['All','Balod', 'Balrampur', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada',
     'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham',
     'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur',
     'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'] },
    // tslint:disable-next-line:whitespace
    { name: 'Dadra Nagar Haveli and Daman Diu', cities: ['All','  Daman district', 'Diu district', 'Dadra and Nagar Haveli district'] },
    { name: 'Delhi', cities: ['All','New Delhi', 'North Delhi', 'North West Delhi', 'West Delhi', 'South West Delhi',
     'South Delhi ', 'South East Delhi', 'Central Delhi', 'North East Delhi', 'Shahdara', 'East Delhi'] },
    // tslint:disable-next-line:whitespace
    { name: 'Goa', cities: ['All','North Goa', 'South Goa'] },
    { name: 'Gujarat', cities: ['All','Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
     'Bhavnagar', 'Botad' , 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi', 'Gandhinagar', 'Gir Somnath',
      'Jamnagar', 'Junagadh', 'Kutch', 'Kheda', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari',
       'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'] },
    { name: 'Haryana', cities: ['All','Ambala', 'Bhiwani', 'Charkhi', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar',
     'Jhajjar', 'Jind', 'Kaithal'  , 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula',
      'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'] },
    { name: 'Himachal Pradesh', cities: ['All','Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu',
     'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'] },
    { name: 'Jammu and Kashmir', cities: ['All', 'Doda District', 'Jammu District', 'Kathua District',
    'Kishtwar District', 'Poonch District', 'Rajouri District', 'Ramban District', 'Reasi District',
    'Samba District', 'Udhampur District', 'Anantnag District', 'Bandipora District', 'Baramulla district',
     'Budgam District', 'Ganderbal District', 'Kulgam District', 'Kupwara District', 'Pulwama District',
      'Shopian District', 'Srinagar District'] },
    { name: 'Karnataka', cities: ['All','Bagalkote', 'Belgaum', 'Bijapur', 'Dharwad', 'Gadag', 'Haveri',
     'Uttara Kannada', 'Shimoga', 'Bangalore Rural', 'Ramanagara', 'Chikkaballapura', 'Chitradurga',
      'Davanagere', 'Kolar', 'Bangalore Urban', 'Tumakuru', 'Ballari', 'Bidar', 'Gulbarga', 'Koppala',
      'Raichuru', 'Yadagiri', 'Chamarajanagara', 'Chikkamagaluru', 'Dakshina Kannada', 'Hassan', 'Kodagu', 'Mandya', 'Mysore', 'Udupi'] },
    { name: 'Kerala', cities: ['All','Thiruvananthapuram', 'Kollam', 'Alappuzha', 'Pathanamthitta', 'Kottayam',
     'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'] },
    { name: 'Ladakh', cities: ['All','Kargil District', 'Leh District'] },
    { name: 'Madhya Pradesh', cities: ['All','AGAR-MALWA', 'Alirajpur', 'Anuppur', 'Ashok Nagar', 'Balaghat',
    'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia',
     'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua',
      'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari',
       'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol',
       'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrouli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'] },
    { name: 'Maharashtra', cities: ['All','Akola', 'Amravati', 'Buldana', 'Yavatmal', 'Washim', 'Amravati',
     'Aurangabad', 'Marathwada', 'Beed', 'Jalna', 'Osmanabad', 'Nanded', 'Latur', 'Parbhani', 'Hingoli',
     'Aurangabad', 'Konkan', 'Mumbai City', 'Mumbai Suburban', 'Thane', 'Palghar', 'Raigad', 'Ratnagiri',
      'Sindhudurg', 'Nagpur', 'Vidarbha', 'Bhandara', 'Chandrapur', 'Gadchiroli', 'Gondia', 'Wardha',
      'Nagpur', 'Nashik Division', 'Khandesh', 'Dhule', 'Jalgaon', 'Nandurbar', 'Pune', 'Paschim Maharashtra',
      'Kolhapur', 'Pune', 'Sangli', 'Satara', 'Solapur', 'Ahmednagar'
  ] },
    { name: 'Manipur', cities: ['All','Bishnupur', 'Thoubal', 'Imphal East', 'Imphal West', 'Senapati', 'Ukhrul',
    'Chandel', 'Churachandpur', 'Tamenglong', 'Jiribam', 'Kangpokpi', 'Kakching', 'Tengnoupal', 'Kamjong', 'Noney', 'Pherzawl'] },
    { name: 'Meghalaya', cities: ['All','West Jaintia Hills (Jowai)', 'East Jaintia Hills (Khliehriat)',
    'East Khasi Hills (Shillong)', 'West Khasi Hills (Nongstoin)', 'South West Khasi Hills (Mawkyrwat)',
     'Ri-Bhoi (Nongpoh)', 'North Garo Hills (Resubelpara)', 'East Garo Hills (Williamnagar)',
      'South Garo Hills (Baghmara)', 'West Garo Hills (Tura)', 'South West Garo Hills (Ampati)'] },
    { name: 'Mizoram', cities: ['All','Aizawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip', 'Champhai'] },
    { name: 'Puducherry', cities: ['Karaikal district', 'Mahé district', 'Puducherry district', 'Yanam district'] },
    { name: 'Nagaland', cities: ['All','Dimapur district', 'Kiphire district', 'Kohima district', 'Longleng district',
     'Mokokchung district', 'Mon District', 'Peren district', 'Phek district', 'Tuensang district',
      'Wokha district', 'Zunheboto district', 'Noklak district'] },
    { name: 'Odisha', cities: ['All','Angul', ' Balangir', ' Balasore', ' Bargarh', ' Bhadrak', ' Boudh',
    ' Cuttack', ' Deogarh', ' Dhenkanal', ' Gajapati', ' Ganjam', ' Jagatsinghpur', ' Jajpur', ' Jharsuguda',
    ' Kandhamal', ' Kalahandi', ' Kendrapara', ' Keonjhar', ' Khordha', ' Koraput', ' Malkangiri', ' Mayurbhanj',
     ' Nabarangpur', ' Nayagarh', ' Nuapada', ' Puri', ' Rayagada', ' Sambalpur', ' Subarnapur', ' Sundargarh'] },
    { name: 'Punjab', cities: ['All','Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Firozpur',
     'Fazilka', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana ', 'Mansa', 'Moga',
     'Sri Muktsar Sahib', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur',
     'Shahid Bhagat Singh Nagar', 'Taran Taran'] },
    { name: 'Rajasthan', cities: ['All','Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur',
     'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh   Chittorgarh', 'Churu', 'Dausa', 'Dholpur',
     'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalor ', 'Jhalawar', 'Jhun', 'Jodhpur',
      'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand   Rajsamand', 'Sawai Madhopur',
      'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur', 'Rajasthan'] },
    { name: 'Sikkim', cities: ['All','East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'] },
    { name: 'Tamil Nadu', cities: ['All','Ariyalu', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
     'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri',
     'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
     'Ramanathapuram', 'Ranipet', 'Salem ', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi',
      'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
      'Vellore', 'Viluppuram', 'Virudhunagar'] },
    { name: 'Telangana', cities: ['All','Adilabad', 'Komaram Bheem', 'Bhadradri', 'Hyderabad', 'Jagtial', 'Jangaon',
    'Jayashankar', 'Jogulamba', 'Kamareddy', 'Karimnagar', 'Khammam', 'Mahabubabad', 'Mahbubnagar',
    'Mancherial', 'Medak', 'Medchal–Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanapet',
    'Nirmal', 'Nizamabad', 'Peddapalli ', 'Rajanna Sircilla', 'Ranga Reddy', 'Sangareddy', 'Siddipet',
     'Suryapet', 'Vikarabad', 'Wanaparthy Warangal (Rural)', 'Warangal (Urban)', 'Yadadri'] },
    // tslint:disable-next-line: max-line-length
    { name: 'Tripura', cities: ['All','Dhalai', 'Sipahijala', 'Khowai', 'Gomati', 'Unakoti', 'North Tripura', 'South Tripura', 'West Tripura'] },
    { name: 'Uttar Pradesh', cities: ['All','Agra', 'Aligarh', 'PrayagRaj', 'Ambedkar Nagar', 'Amroha', 'Auraiya',
    'Azamgarh', 'Badaun', 'Bahraich', 'Ballia', 'Balrampur', 'Banda District', 'Barabanki', 'Bareilly',
    'Basti', 'Bijnor', 'Bulandshahr', 'Chandauli(Varanasi Dehat)', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah',
     'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam', 'Ghaziabad', 'Ghazipur', 'Gonda',
     'Gorakhpur', 'Hamirpur', 'Hapur District', 'Hard', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri',
      'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur',
      'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae Bareli', 'Rampur', 'Saharanpur',
       'Sant Kabir Nagar', 'Sant Ravidas Nagar', 'Sambhal', 'Shahjahanpur', 'Shamli', 'Shravasti',
        'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi (Kashi)', 'Allahabad', 'Amethi', 'Bagpat'] },
    { name: 'Uttarakhand', cities: ['All','Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar',
     'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'] },
    { name: 'West Bengal', cities: ['All','Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
    'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad',
     'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia',
      'South 24 Parganas', 'Uttar Dinajpur'] },
    { name: 'Andaman and Nicobar Islands', cities: ['All','Nicobar', 'North and Middle Andaman', 'South Andaman'] }
  ];
  cities: Array<any>;
  changeCountry(event, count) {
    this.cities = this.countryList.find(con => con.name === count.name).cities;
  }
  Location(){
    console.log("area");

  }
  Speciality()
  {
    console.log("speciality");
  }
}
