import { FieldOptions } from '../../../model/FieldOptions.model';
import { FormItems } from '../../../model/FormItems.model';

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldsAction } from '../../../store/fields.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-field-styling-form',
  templateUrl: './field-styling-form.component.html',
  styleUrls: ['./field-styling-form.component.scss']
})
export class FieldStylingFormComponent {
  @Input() selectedItem!:FormItems;

  profileForm = new FormGroup({
    placeholderText: new FormControl(null,[Validators.min(1)]),
    width: new FormControl(null,[Validators.max(800)]),
    height: new FormControl(null,[Validators.max(400)]),
    fontSizeInput: new FormControl(null,[Validators.max(72)]),
  });

  constructor (private store$: Store){ }

  onSubmit() {
    console.log(this.profileForm.value);
    
    let item = JSON.parse(JSON.stringify(this.selectedItem))
    
    Object.keys(item.fieldOptions)
    .forEach(key => {
      if (item.fieldOptions.hasOwnProperty(key) && this.profileForm.value[key] !== null){
        item.fieldOptions[key as keyof FieldOptions] = this.profileForm.value[key]
      }
      
    });
    this.store$.dispatch(FieldsAction.changeField({field: item}));
    this.profileForm.reset()
  }
} 
