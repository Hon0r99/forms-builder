import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { FieldStylingFormComponent } from './field-styling-form.component';

describe('FieldStylingFormComponent', () => {
  let component: FieldStylingFormComponent;
  let fixture: ComponentFixture<FieldStylingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({}),],
      imports: [ReactiveFormsModule,],
      declarations: [ FieldStylingFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldStylingFormComponent);
    component = fixture.componentInstance;
    const item = {
      "type": "input",
      "label": "Text input",
      "theme": "primary",
      "fieldOptions": {
        "placeholderText": "Placeholder text",
        "width": 200,
        "fontSizeInput": 14,
        "borderStyle": "hidden",
        "required": false
      }
    
    };
    component.selectedItem = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component.profileForm);
  });

  it('should reset profileForm', () => {
    component.onSubmit()
    expect(component.profileForm.value).toEqual({
      "placeholderText": null,
      "width": null,
      "height": null,
      "fontSizeInput": null,
      "borderStyle": null,
      'required': null,
  });
  });
});
