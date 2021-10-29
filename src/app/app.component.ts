import { TextareaComponent } from './components/textarea/textarea.component';
import { FormItems } from './model/FormItems.model';
import { AfterViewInit, Component,  ComponentFactoryResolver,  OnInit,  TemplateRef,  ViewChild, ViewContainerRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem,transferArrayItem} from '@angular/cdk/drag-drop';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal} from '@angular/cdk/portal';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedItem!:any;
  mainTheme:string = 'primary';

  formItems:FormItems[] = [
    { type: 'input', label: 'Text input', theme: this.mainTheme, fieldOptions: {placeholderText: 'Placeholder text', width: 200, fontSizeInput: 14,}},
    { type: 'textarea', label: 'Textarea', theme: this.mainTheme,  fieldOptions:{width: 200, placeholderText: 'Placeholder text'}},
    { type: 'button',  label:'Button', theme: this.mainTheme,  fieldOptions:{width: 80, height:38, placeholderText: 'Submit',}},
    { type: 'checkbox', label:'Checkbox', theme: this.mainTheme, fieldOptions:{placeholderText: 'Placeholder text'}},
    { type:'select',  label:'Select', theme: this.mainTheme,  options: ['val1', 'val2'],fieldOptions:{placeholderText: 'Placeholder text'}}
  ];

  droppedItems:FormItems[] = [
   
  ];


  selectTheme = [
    {value: 'primary', viewValue: 'Primary'},
    {value: 'accent', viewValue: 'Accent'},
    {value: 'warn', viewValue: 'Warn'}
  ]


  drop(event: any){
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.droppedItems.push(JSON.parse(JSON.stringify({id: event.container.data.length, theme: this.mainTheme, ...event.previousContainer.data[event.previousIndex]})))
    }
  }

  select(item:any){;
    this.selectedItem = item;
  }

  setChanges(){
    console.log(this.mainTheme);
    this.droppedItems.forEach(el => {
      el.theme = this.mainTheme;
      
    })
    this.formItems.forEach(el => {
      el.theme = this.mainTheme;
      
    })
  }
}
