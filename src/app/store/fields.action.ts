import { FormItems } from './../model/FormItems.model';
import { createAction, props } from '@ngrx/store'

export namespace FieldsAction {
    export const newField = createAction(
        'NEW_FIELD',
        props< {field: FormItems, index: number}>()
    );
    export const moveField = createAction(
        'MOVE_FIELD',
        props< {currentIndex: number, previousIndex: number}>()
    );
    export const selectField = createAction(
        'SELECT_FIELD',
        props< {field: FormItems}>()
    );
}