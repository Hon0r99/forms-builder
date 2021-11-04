
import { FormItems } from './model/FormItems.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { FieldsAction } from './store/fields.action';
import { FieldsSelectors } from './store/fields.selectors';
import { Observable } from 'rxjs';

import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  selectedItem$:Observable<FormItems>;
  droppedItems$:Observable<FormItems[]>;

  mainTheme!:string;
  formItems!:FormItems[];

 

  selectTheme = [
    {value: 'primary', viewValue: 'Primary'},
    {value: 'accent', viewValue: 'Accent'},
    {value: 'warn', viewValue: 'Warn'}
  ]


  constructor (private store$: Store, private http: HttpClient){
    this.selectedItem$ = this.store$.select(FieldsSelectors.selectedItem)
    this.droppedItems$ = this.store$.select(FieldsSelectors.droppedItems)
  }

  ngOnInit(){
    this.http.get('http://localhost:3000/formItems').subscribe((data:any) => {this.formItems = data; this.mainTheme = data[0].theme});
  }


  drop(event: any){
    if (event.previousContainer === event.container) {
      this.store$.dispatch(FieldsAction.moveField({currentIndex: event.currentIndex, previousIndex: event.previousIndex}))
    } else {
      this.store$.dispatch(FieldsAction.newField({field: JSON.parse(JSON.stringify({id: event.container.data.length, theme: this.mainTheme, ...event.previousContainer.data[event.previousIndex]})), index: event.currentIndex}))
    }
    
  }

  select(item:FormItems){
    this.store$.dispatch(FieldsAction.selectField({field: item}))
  }

  setChanges(){
    this.store$.dispatch(FieldsAction.changeTheme({theme: this.mainTheme}))
    this.formItems.forEach(el => {
      el.theme = this.mainTheme;
      
    }) 
  }
}
