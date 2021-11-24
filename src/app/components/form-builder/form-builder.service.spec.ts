import { FormItems } from './../../model/FormItems.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FormBuilderService } from './form-builder.service';
import { State } from 'src/app/store/fields.reducer';

describe('FormBuilderService', () => {
  let service: FormBuilderService;
  let httpMock: HttpTestingController;
  let store: MockStore<State>;
  const initialState = {
    droppedItems: [],
    selectedItem: {fieldOptions: {}},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(FormBuilderService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getFormItems() should http GET FormItems', () => {

    const formItems: FormItems[] = [
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

    service.getFormItems().subscribe((res) => {
      expect(res).toEqual(formItems);
    });

    const req = httpMock.expectOne('http://localhost:3000/formItems');
    expect(req.request.method).toEqual("GET");
    req.flush(formItems);

    httpMock.verify();
  });

  it('should select field from dropped items', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    const item = {
      "id": 1,
      "type": "input",
      "label": "Text input",
      "theme": "primary",
      "fieldOptions": {
        "placeholderText": "Placeholder text",
        "width": 200,
        "fontSizeInput": 14
      }
    }
    service.select(item);
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should change theme', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    const theme = 'accent'
    service.setChanges(theme);
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should move field', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    const event = {
      previousContainer: `{
        data: [
          {
              "type": "input",
              "label": "Text input",
              "theme": "primary",
          }
        ]
      }`,
      container:  `{
        data: [
          {
              "type": "input",
              "label": "Text input",
              "theme": "primary",
          }
        ]
      }`,
    }
    const theme = 'accent'
    service.drop(event, theme);
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a new field', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    const event = {
      previousContainer: {
        data: [
          {
              "type": "input",
              "label": "Text input",
              "theme": "primary",
          }
        ]
      },
      container:  {
        data: [
          {
              "type": "textarea",
              "label": "Text input",
              "theme": "primary",
          }
        ]
      },
    }
    const theme = 'accent'
    service.drop(event, theme);
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

});
