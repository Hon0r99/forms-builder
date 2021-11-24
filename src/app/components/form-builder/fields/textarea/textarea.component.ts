import { FormItems } from '../../../../model/FormItems.model';
import { Component, Input,  } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input () public item!:FormItems;
}
