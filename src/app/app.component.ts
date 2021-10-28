
import { FormItems } from './model/FormItems.model';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem,transferArrayItem} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

  inputplaceholder!:any;

  currentTarget:any;
  selectedItem:any;

  formItems:FormItems[] = [
    { type: 'input', label: 'Text input', fieldOptions: {placeholderText: 'Placeholder text', width: 200, height: 60, fontSizeInput: 14}},
    { type: 'textarea', label: 'Textarea', fieldOptions:{}},
    { type: 'button',  label:'Button', fieldOptions:{width: 80, height:38, text: 'Submit',}},
    { type: 'checkbox', label:'Checkbox',fieldOptions:{text: 'Cheked'}},
    { type:'select',  label:'Select', options: ['val1', 'val2'],fieldOptions:{text: 'Text',}}
  ];

  droppedItems:FormItems[] = [];

  drop(event: any){
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex)        
    }
  }

  select(item:any){
    this.selectedItem = item;
    console.log(item)
    
  }

  setChanges(){
    this.selectedItem.fieldOptions.placeholderText = this.inputplaceholder;
    console.log(this.selectedItem);
    
  }
}
