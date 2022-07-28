import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Party } from 'src/app/models/party';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-party-detail-side',
  templateUrl: './party-detail-side.component.html',
  styleUrls: ['./party-detail-side.component.css']
})
export class PartyDetailSideComponent implements OnInit {
  getAllparty:Party[]=[];
  getParty:Party[]=[];
  constructor(private partyService:PartyService,public actRoute:ActivatedRoute) { 
    this.getAllParty();
    
  }


  //Get All Party
  getAllParty(){
    this.partyService.getAllParty().subscribe(data=>{
      data.find(a=>{
        this.getAllparty.push(a)
        
      })
    })
  }

  getPartyDetail(id:any){
    this.partyService.getPackById(id).subscribe((data)=>{
       
          this.getParty.push(data)
      
    })
  }

  ngOnInit(): void {
    let id=this.actRoute.snapshot.paramMap.get('id');
    this.getPartyDetail(id)
  }

}
