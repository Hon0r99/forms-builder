import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem,transferArrayItem} from '@angular/cdk/drag-drop';

interface FormItems {
  type?:string,
  inputType?:string,
  placeholder?:string,
  label?:string,
  text?:string,
  options?:Array<string>,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

  currentTarget!:string;

  formItems:FormItems[] = [
    { type: 'input', placeholder: 'placeholder', label: 'Text input'},
    { type: 'textarea', placeholder: 'placeholder textarea text', label: 'Textarea'},
    { type: 'button', text: 'Submit', label:'Button'},
    { type: 'checkbox', text: 'Cheked',label:'Checkbox'},
    { type:'select', text: 'Text', label:'Select', options: ['val1', 'val2']}
  ];

  droppedItems:FormItems[] = [];

  drop(event: any){
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  select(event:Event){
    this.currentTarget = (event.target as HTMLInputElement).value
  }

}
