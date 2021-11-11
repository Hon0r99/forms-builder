import { FormItems } from './../../model/FormItems.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { FieldsAction } from 'src/app/store/fields.action';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private http: HttpClient, private store$: Store) {}

  getFormItems(){
    return this.http.get('http://localhost:3000/formItems');
  }


  drop(event: any, mainTheme: string){
    console.log(event);
    
    if (event.previousContainer === event.container) {
      this.store$.dispatch(FieldsAction.moveField({currentIndex: event.currentIndex, previousIndex: event.previousIndex}))
    } else {
      this.store$.dispatch(FieldsAction.newField({field: JSON.parse(JSON.stringify({id: event.container.data.length, theme: mainTheme, ...event.previousContainer.data[event.previousIndex]})), index: event.currentIndex}))
    }
    
  }

  select(item:FormItems){
    this.store$.dispatch(FieldsAction.selectField({field: item}))
  }

  setChanges(mainTheme:string){
    this.store$.dispatch(FieldsAction.changeTheme({theme: mainTheme}))
  }
}
