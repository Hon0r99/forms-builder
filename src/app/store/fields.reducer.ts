
import { Action, createReducer, on } from "@ngrx/store";
import { FormItems } from "../model/FormItems.model";
import { User } from "../model/User.model";
import { FieldsAction } from "./fields.action";

export interface State {
    droppedItems:FormItems[],
    selectedItem:FormItems,
    user?:User,
}

const initialState: State = {
    droppedItems: [],
    selectedItem: {fieldOptions: {}},
};

const feildsReducer = createReducer(
    initialState,
    on(FieldsAction.newField, (state,{field, index}) =>({
        ...state,
        droppedItems: [...state.droppedItems.slice(0, index), field, ...state.droppedItems.slice(index)]
    })),
    on(FieldsAction.moveField, (state,{currentIndex, previousIndex}) =>({
        ...state,
        droppedItems: [
            ...[...state.droppedItems.slice(0,previousIndex), ...state.droppedItems.slice(previousIndex + 1)].slice(0,currentIndex), 
                state.droppedItems[previousIndex],
        ...[...state.droppedItems.slice(0,previousIndex), ...state.droppedItems.slice(previousIndex + 1)].slice(currentIndex)
]
    })),
    on(FieldsAction.selectField, (state,{field}) =>({
        ...state,
        selectedItem: field
    })),
    on(FieldsAction.changeField, (state,{field}) =>({
        ...state,
        droppedItems: state.droppedItems.map(el => (el.id === field.id ? field : el))
    })),
    on(FieldsAction.changeTheme, (state,{theme}) =>({
        ...state,
        droppedItems: state.droppedItems.map(el => {
            return {...el, theme: theme}
        })
    })),
    on(FieldsAction.newUser, (state,{user}) =>({
        ...state,
        user: {...user},
    })),
);


export function reducer(state: State | undefined, action: Action) {
    return feildsReducer(state, action)
}