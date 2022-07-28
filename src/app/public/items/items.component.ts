import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ItemService } from 'src/app/services/item.service';


/**
 * @title Table with selection
 */
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
 
filData:any;

  collectData:any[]=[];
  data:any[]=[];
  
  displayedColumns: string[] = ['select', 'item', 'itemDesc', 'openingStock', 'date','sel','purchase','actions'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>(this.collectData);
  selection = new SelectionModel<any>(true, []);
  selectRow(row:any){
   this.data=[];
  if(this.selection.isSelected(row)){
    console.log("Wow!")

  this.data.push(row)
  console.log(row)
  // console.log(this.data)


  }else{
    console.log('hmmmm...')
  }
  console.log(this.data)
  }
  
  //filterData
  filterData(filterValue:any)
  {
    this.dataSource.filter=filterValue;
    
    
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
  constructor(private itemService:ItemService) { 
  console.log(this.selection)

  }

  
  
  getItems(){
    this.itemService.getItems().subscribe(data=>{
      for (const order of data) {
        // const newOrder =(order[0], order[1], order[2], order[3]);
        this.collectData.push(order);
      }
     
      this.dataSource = new MatTableDataSource<any>(this.collectData);
    })

  }

  //Update Items
  updateItems(){

  }

  ngOnInit(): void {
    this.getItems();
  }

}


