import { FormItems } from '../../model/FormItems.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { FieldsAction } from '../../store/fields.action';
import { FieldsSelectors } from '../../store/fields.selectors';
import { Observable } from 'rxjs';

import { HttpClient} from '@angular/common/http';
import { FormBuilderService } from './form-builder.service';

enum fieldsEnum{
  textarea,
  button,
  checkbox,
  input,
  select
} 

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent  implements OnInit{
  public selectedItem$:Observable<FormItems>;
  public droppedItems$:Observable<FormItems[]>;

  public mainTheme!:string;
  public formItems!:FormItems[];
  public fields = fieldsEnum;

  public selectTheme = [
    {value: 'primary', viewValue: 'Primary'},
    {value: 'accent', viewValue: 'Accent'},
    {value: 'warn', viewValue: 'Warn'}
  ]

  constructor (private store$: Store, private http: HttpClient, private fromBuilderService: FormBuilderService){
    this.selectedItem$ = this.store$.select(FieldsSelectors.selectedItem)
    this.droppedItems$ = this.store$.select(FieldsSelectors.droppedItems)
  }

  ngOnInit(){
    this.fromBuilderService.getFormItems().subscribe((data:any) => {this.formItems = data; this.mainTheme = data[0].theme});
  }


  public drop(event: any): void {
    this.fromBuilderService.drop(event, this.mainTheme)
  }

  public select(item:FormItems): void {
    this.fromBuilderService.select(item)
  }

  public setChanges(): void {
    this.fromBuilderService.setChanges(this.mainTheme, )
    this.formItems.forEach(el => {
      el.theme = this.mainTheme;
      
    }) 
  }
}
