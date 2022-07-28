import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Party } from 'src/app/models/party';
import { PartyService } from 'src/app/services/party.service';
import { PurchaseInvoicesService } from 'src/app/services/purchase-invoices.service';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {
 getParty:Party[]=[];
 getAllParty:Party[]=[];
 getAllpay:Party[]=[];
 getAllcollect:Party[]=[];
 getAllTransData:any[]=[];
 getQuery:any;
  constructor(public actRoute:ActivatedRoute,
    private partyService:PartyService,
    private purchaseService:PurchaseInvoicesService
    ) { }

  ngOnInit(): void {
    let id=this.actRoute.snapshot.paramMap.get('id');
    this.getPartyDetail(id);
    this.getPartys();
    this.getAllToPay();
    this.getAllCollect();
    this.actRoute.queryParams.subscribe(data=>{
      console.log(data)
      this.getQuery=data
  })
  this.getAllTrans();
  }
  
  getPartyDetail(id:any){
    this.partyService.getPackById(id).subscribe((data)=>{
       
          this.getParty.push(data)
      
    })
  }

  //get Party by category
  getPartys(){
    this.partyService.getAllParty().subscribe(data=>{
      data.find(a=>{
        this.getAllParty.push(a);
        
      })
    })
  }
//get To Pay
  getAllToPay(){
    this.partyService.getAllPay().subscribe(data=>{
      data.find(a=>{
        this.getAllpay.push(a);
        console.log(this.getAllpay)
      })
    })
  }

  //get To Collect
  getAllCollect(){
    this.partyService.getAllCollect().subscribe(data=>{
      data.find(a=>{
        this.getAllcollect.push(a)
      })
    })
  }

  //get All Transection
  getAllTrans(){
    this.purchaseService.getAllTrans().subscribe(data=>{
      this.getAllTransData=data;
      console.log(this.getAllTransData)
    })
  }
}
