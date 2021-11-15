import { MatButtonModule } from '@angular/material/button';
import { FormItems } from './../../model/FormItems.model';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { HttpHandler } from '@angular/common/http'; 
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveComponentModule } from '@ngrx/component';

import { FormBuilderComponent } from './form-builder.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilderService } from './form-builder.service';
import { Observable, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;
  let formBuilderService: FormBuilderService;
  let spy: jasmine.Spy;
  let mockFormsItem: FormItems[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),ReactiveComponentModule, MatButtonModule],
      providers: [Store, HttpClientModule, HttpClient, HttpHandler, FormBuilderService],
      declarations: [ FormBuilderComponent, CdkDropList ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    formBuilderService = fixture.debugElement.injector.get(FormBuilderService);
    component.mainTheme = 'accent';
    component.droppedItems$ = of([{
        "type": "input",
        "label": "Text input",
        "theme": "primary",
        "fieldOptions": {
          "placeholderText": "Placeholder text",
          "width": 200,
          "fontSizeInput": 14
        }
      }]
    );
    component.selectedItem$ = of({
      "type": "input",
      "label": "Text input",
      "theme": "primary",
      "fieldOptions": {
        "placeholderText": "Placeholder text",
        "width": 200,
        "fontSizeInput": 14
      }
    }
  );
    

    mockFormsItem = [
      {
        "type": "input",
        "label": "Text input",
        "theme": "primary",
        "fieldOptions": {
          "placeholderText": "Placeholder text",
          "width": 200,
          "fontSizeInput": 14
        }
      },
      {
        "type": "textarea",
        "label": "Textarea",
        "theme": "primary",
        "fieldOptions": {
          "width": 200,
          "placeholderText": "Placeholder text"
        }
      },
      {
        "type": "button",
        "label": "Button",
        "theme": "primary",
        "fieldOptions": {
          "width": 80,
          "height": 38,
          "placeholderText": "Submit"
        }
      },
      {
        "type": "checkbox",
        "label": "Checkbox",
        "theme": "primary",
        "fieldOptions": {
          "placeholderText": "Placeholder text"
        }
      },
     
    ];    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call formBuilderService', () => {
    spy = spyOn(formBuilderService, 'getFormItems').and.returnValue(of(mockFormsItem))

    component.ngOnInit();
    expect(spy.calls.count()).toBe(1);
  });

  it('should call drop', () => {
    spy = spyOn(formBuilderService, 'drop')
    component.drop('event');
    expect(spy.calls.count()).toBe(1);
  });

  it('should call select', () => {
    spy = spyOn(formBuilderService, 'select')
    let item =  {
      "type": "button",
      "id": 1,
      "label": "Button",
      "theme": "primary",
      "fieldOptions": {
        "width": 80,
        "height": 38,
        "placeholderText": "Submit"
      }
    };
    component.select(item);
    expect(spy.calls.count()).toBe(1);
  });

  it('should call setChanges and change theme of formItems', () => {
    component.formItems = mockFormsItem;
    spy = spyOn(formBuilderService, 'setChanges')
    component.setChanges();
    expect(spy.calls.count()).toBe(1);
    component.formItems.forEach(el => {
      expect(el.theme).toBe('accent')
    })

  });

  it('should set formItems', () => {
    spy = spyOn(formBuilderService, 'getFormItems').and.returnValue(of(mockFormsItem))

    component.ngOnInit();
    expect(component.formItems).toEqual(mockFormsItem)
  });
});
