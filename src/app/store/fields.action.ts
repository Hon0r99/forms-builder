import { FormItems } from './../model/FormItems.model';
import { createAction, props } from '@ngrx/store'
import { User } from '../model/User.model';

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
    export const changeField = createAction(
        'SELECT_FIELD',
        props< {field: FormItems}>()
    );
    export const changeTheme = createAction(
        'CHANGE_THEME',
        props< {theme: string}>()
    );
    export const newUser = createAction(
        'NEW_USER',
        props< {user: User}>()
    );
}