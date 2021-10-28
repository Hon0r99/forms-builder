import { FieldOptions } from './FieldOptions.model';

export interface FormItems {
    id?:number,
    type:string,
    label:string,
    text?:string,
    options?:Array<string>,
    fieldOptions?:FieldOptions,
  }