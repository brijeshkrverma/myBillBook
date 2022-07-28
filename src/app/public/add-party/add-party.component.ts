import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from 'src/app/models/party';
import { Service } from 'src/app/services/.service';
import { PartyService } from 'src/app/services/party.service';
import {Component} from '..//.component';


@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit {

  AddParty:any;
  formData:FormGroup;
  balancetype=["To Collect","To Pay"];
  
  partytype=["Customer","Supplier"];
  placeOfSupplys=["Andaman & Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra & Nagar Haveli","Daman & Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Ladakh","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
  partyCategories=["List","Of","Backend","Categaryb","Data"]
  getCreatedCategory:any;
  constructor(
    private fba:FormBuilder,
    public activeRouter:ActivatedRoute,
    private partyService:PartyService,
    private router:Router

  ) {
//     super(FormBuilder,Service,Router,ActivatedRoute)
// super.Service
//     console.log(super.fb)
    this.formData=this.fba.group({
      partyName:['',[Validators.required]],
      mobile:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      openBalance:[null,[Validators.required]],
      balanceType:['',[Validators.required]],
      partyType:['',[Validators.required]],
      partyCategory:['',[Validators.required]],
      gstin:[''],
      pan:[''],
      placeOfSupply:[''],
      billAdr:['',[Validators.required]],
      shippingAdr:['',[Validators.required]],
      creditPeriod:[''],
      creditLimit:[null],
    _userId:['']
    })
   }
  
  updateBalance(e:any){
    this.formData.get('balanceType')?.setValue(e.target.value,{onlySelf:true})
  }

  updatePartyType(e:any){
   
    this.formData.get('partyType')?.setValue(e.target.value,{onlySelf:true})
  }
  updateplaceOfSupply(e:any){
    this.formData.get('placeOfSupply')?.setValue(e.target.value,{onlySelf:true})
  }
  updateCategory(e:any){
    this.formData.get('partyCategory')?.setValue(e.target.value,{onSelf:true})
  }

  action(){
    window.alert('Hello')
  }

  createCategory(){
    let person = prompt("Please enter your name", "Harry Potter");
  if (person != null) {
    this.getCreatedCategory=person;
    // this.formData.get('partyCategory')?.setValue(this.getCreatedCategory)
    console.log(this.getCreatedCategory)

    
  } 
    }

   //partySubmit
   partySubmit(){
    this.partyService.createParty(this.formData.value).subscribe(function (res) {     
        console.log(res);
        window.alert('Party Submited')
      })
  }

  get partyName() { return this.formData.get('partyName');}
  get mobile() { return this.formData.get('mobile');}
  get email() { return this.formData.get('email');}
  get openBalance() { return this.formData.get('openBalance');}
  get balanceType() { return this.formData.get('balanceType');}
  get partyType() { return this.formData.get('partyType');}
  get partyCategory() { return this.formData.get('partyCategory');}
  get billAdr() { return this.formData.get('partyCategory');}
  get shippingAdr() { return this.formData.get('partyCategory');}

  ngOnInit(): void {
    
  }

}



