import {ViewChild, AfterViewInit,Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseInvoicesService } from 'src/app/services/purchase-invoices.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  getQuery:string;
  collectData:any[]=[];
  getAllTransData:any[]=[];

  constructor(public activatedRoute:ActivatedRoute,
    public router:Router,
    private purchaseService:PurchaseInvoicesService
    ){
  }
 

  ngOnInit(): void {
    this.getAllTrans();
    throw new Error('Method not implemented.');

  }
  goProducts() {
    this.router.navigate(
      ['/products'],
      { queryParams: { order: 'popular' } }
    );
  }
  

  
  displayedColumns: string[] = ['date', 'partyName', 'type', 'payment'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>(this.collectData);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  //get all Transection
  getAllTrans(){
    this.purchaseService.getAllTrans().subscribe(data=>{
      for (const order of data) {
        // const newOrder =(order[0], order[1], order[2], order[3]);
        this.collectData.push(order);
      }
     
      this.dataSource = new MatTableDataSource<any>(this.collectData);
    })
  }
}

 


