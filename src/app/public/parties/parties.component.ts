import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from 'src/app/models/party';
import { PartyService } from 'src/app/services/party.service';


@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit{
getAllparty:Party[]=[];
getAllpay:Party[]=[];
getAllcollect:Party[]=[]
getParty:Party[]=[];
allSearch:any;

  constructor(private partyService:PartyService,public activeRoute:ActivatedRoute) { 
    let id=this.activeRoute.snapshot.paramMap.get('id');
    this.getPartyDetail(id);
  }
  
  
  getPartyDetail(id:any){
    this.partyService.getPackById(id).subscribe((data)=>{
       
          this.getParty.push(data)
      
    })
  }

  //Get All Party
  getAllParty(){
    this.partyService.getAllParty().subscribe(data=>{
      data.find(a=>{
        this.getAllparty.push(a)
        
      })
    })
  }

  //Get All ToPay By ID
  getAllToPay(){
    this.partyService.getAllPay().subscribe(data=>{
      data.find(a=>{
        this.getAllpay.push(a);
      })
    })
  }

  //get All ToCollect By ID
  getAllCollect(){
    this.partyService.getAllCollect().subscribe(data=>{
      data.find(a=>{
        this.getAllcollect.push(a)
      })
    })
  }

  ngOnInit(): void {
    this.getAllParty();
    this.getAllToPay();
    this.getAllCollect();
   

}
}
