import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
editItem:FormGroup;
  constructor(public actRoute:ActivatedRoute,
    private fb:FormBuilder,private itemService:ItemService) {
      this.editItem=this.fb.group({
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

  ngOnInit(): void {
    this.getAllItem();
  }
  getAllItem()
  {
      this.itemService.getItems().subscribe(data=>{
        console.log(data)
      })
  }

  onSubmit(){
    let id=this.actRoute.snapshot.paramMap.get('id')
    console.log(id)
    this.itemService.updateItem(id,this.editItem.value).subscribe(data=>{
      console.log(data)
      alert(data.item)
    })
  }

}
