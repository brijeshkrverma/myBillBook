import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/services/item.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PurchaseInvoicesComponent } from 'src/app/purchases/purchase-invoices/purchase-invoices.component';
export interface DialogData{
  item:any;
  itemDesc:any;
  openingStock:any;
  date:any;
  sel:any;
  purchase:any;
}

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  item:any;
  itemDesc:any;
  openingStock:any;
  date:any;
  sel:any;
  purchase:any;
  collectData:any[]=[];
  dataa:any[]=[];
  
  displayedColumns: string[] = ['select', 'item', 'itemDesc', 'openingStock', 'date','sel','purchase'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>(this.collectData);
  selection = new SelectionModel<any>(true, []);

 

  selectRow(row:any){
    this.dataa=[];
   if(this.selection.isSelected(row)){
     console.log("Wow!")
    
   this.dataa.push(row)
   console.log(row)
   
   console.log(this.dataa)
   this.dataa.forEach(a=>{
    this.item=a.item;
    this.itemDesc=a.itemDesc;
    this.openingStock=a.openingStock;

    this.date=a.date
    this.sel=a.sel;
    this.purchase=a.purchase;
   })
 
   }
   
  //  console.log("Items: "+this.item)
   }
   
   
 
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.dataSource.data.length;
     console.log(this.selection.select(numRows))
     
 
     return numSelected === numRows;
 
   }
     
   
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
     if (this.isAllSelected()) {
       this.selection.clear();
       return;
     }
 
     this.selection.select(...this.dataSource.data);
     
   }
 
 
   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: any): string {
     if (!row) {
       return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
     }
     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
   }
  
   constructor(private itemService:ItemService,
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){}
   
  
    
    
    getItems(){
      this.itemService.getItems().subscribe(data=>{
        for (const order of data) {
          // const newOrder =(order[0], order[1], order[2], order[3]);
          this.collectData.push(order);
        }
       
        this.dataSource = new MatTableDataSource<any>(this.collectData);
      })
  
    }
  
    ngOnInit(): void {
      this.getItems();
      
    }

    

}
