import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
itemForm:FormGroup;
allItem=[];
  constructor(private fb:FormBuilder,private itemService:ItemService, private router:Router) { 
    this.itemForm=this.fb.group({
      item:[''],
      itemDesc:[''],
      openingStock:[''],
      date:[''],
      salesPrice:[''],
      purchasePrice:[''],
      hsnCode:[''],
      gst:['']
    })
  }


  createItem(){
    this.itemService.createItem(this.itemForm.value).subscribe(data=>{
      console.log(data)
      this.router.navigateByUrl('/items')
    })
  }

  getAll(){
    this.itemService.getItems().subscribe(data=>{
      console.log(data)
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

}
