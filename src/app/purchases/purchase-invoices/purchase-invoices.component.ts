import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Party } from 'src/app/models/party';
import { PurchaseInvoicesService } from 'src/app/services/purchase-invoices.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from 'src/app/public/item-dialog/item-dialog.component';
import { ItemService } from 'src/app/services/item.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartyService } from 'src/app/services/party.service';
export interface DialogData{
  item:any;
  itemDesc:any;
  openingStock:any;
  date:any;
  sel:any;
  purchase:any;
}

@Component({
  selector: 'app-purchase-invoices',
  templateUrl: './purchase-invoices.component.html',
  styleUrls: ['./purchase-invoices.component.css']
})
export class PurchaseInvoicesComponent  implements OnInit {
  item:any;
  itemDesc:any;
  gst:any;
  openingStock:any;
  date:any;
  sel:any;
  purchase:any;
  quantity:any=1;
  purchaseInvoice:Login[]=[];
  getQuerys:any;
  getPartyName:Party[]=[];
  currDiv:boolean=true;
  updateBal:any;
  originalBal:any;
  originalValue:any;
  getName:any;
  @ViewChild('htmlData') htmlData!: ElementRef;
  name:string;
  formData:FormGroup;
  transectionForm:FormGroup;
  constructor(private purchaseService:PurchaseInvoicesService,
     private router:Router,
     private fb:FormBuilder,
     private partyService:PartyService,
     private actRoute:ActivatedRoute,
     public dialog:MatDialog) {
      // this.getData(this.quantity)

      this.formData=this.fb.group({
        openBalance:[null]
      })

      this.transectionForm=this.fb.group({
         date:[Date],
        partyName:[''],
        type:['Purchase Invoice'],
        payment:['null']        
      })
      
      }
      
      
  transectionValue(){
    var today=new Date();
     this.transectionForm.get('date')?.setValue(today.toLocaleDateString("en-US"));
     this.transectionForm.get('partyName')?.setValue(this.getName);
     this.transectionForm.get('payment')?.setValue(this.updateBal);
  }
      //invoice Transection
      regTransection()
      {
         this.purchaseService.transection(this.transectionForm.value).subscribe(data=>{
           console.log(data)
         })
      }


      ShowDiv() {
        this.currDiv = false;
        let data=((this.gst/100)*this.purchase*this.quantity)+this.purchase*this.quantity;
        this.updateBal=data
        // // this.fg.setValue({openingBalance:data})
      this.updateBalance();
        // this.fg.get('openingBalance').setValue(data)
    } 

    //Update Balance
    updateBalance(){
      let id=this.actRoute.snapshot.paramMap.get('id');
      for(let partyBalance of this.getPartyName)
      {
        this.getName=partyBalance.partyName
        this.originalBal=partyBalance.openBalance
        if(this.originalBal >= this.updateBal){
      this.originalValue=this.originalBal-this.updateBal
        }else{
          alert("Please Check Your Balance.")
            this.router.navigateByUrl('/parties')
        }
      }
      this.formData.get('openBalance')?.setValue(this.originalValue);
      console.log(this.originalValue)
     console.log(this.formData.value)
      this.partyService.updateBalance(id,this.formData.value).subscribe(a=>{
        console.log("updateData: "+a)
        console.log(a)
      })
      this.transectionValue();
      this.regTransection();
     
    }
    public openPDF(): void {
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(this.getPartyName[0].partyName+".pdf");
      });
    }


    //
    sendMail(){
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(this.getPartyName[0].partyName+".pdf");

        
      });
    }
     

      // getData(quantity:any)
      // {
      //     this.purchase*quantity;
      //     console.log(this.purchase*quantity)
      // }

      openDialog(){
        const dialogRef=this.dialog.open(ItemDialogComponent,{
          data: this.name
        })
        dialogRef.afterClosed().subscribe(res=>{
          console.log(res)
        for(let data of res)
        {
          this.item=data.item
          console.log(this.item)
          this.itemDesc=data.itemDesc
          this.date=data.date
          this.sel=data.salesPrice
          this.purchase=data.purchasePrice
          this.gst=data.gst
        }
        // this.getData(this.quantity);
        })
      }
     
  
 
  //Get User
   getUser(){
     this.purchaseService.getUsers().subscribe(data=>{
      this.purchaseInvoice=data;
      console.log(this.purchaseInvoice)

      // console.log(this.purchaseInvoice)
     })
   }
  //  ((gst/100)*purchase*quantity)+purchase*quantity
   getPrice()
   {
    let data=((this.gst/100)*this.purchase*this.quantity)+this.purchase*this.quantity
    alert(data) 
  }
  //Get Party by name
   getPartyByName()
   {
     console.log(this.getQuerys)
     this.purchaseService.getPartuNyName(this.getQuerys).subscribe(data=>{
       console.log(data)
       this.getPartyName=data

     })
   }
    
  //Get Items

  ngOnInit(): void {
    this.getUser();
    this.actRoute.queryParams.subscribe(data=>{
      // console.log(data)
      this.getQuerys=data.partyName;
    })
    this.getPartyByName();
    let id=this.actRoute.snapshot.paramMap.get('id');
    console.log(id)
    
  }
 

}
