
import { Action, createReducer, on } from "@ngrx/store";
import { FormItems } from "../model/FormItems.model";
import { FieldsAction } from "./fields.action";

export interface State {
    droppedItems:FormItems[],
    selectedItem:FormItems,
}

const initialState: State = {
    droppedItems: [],
    selectedItem: {},
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
    on(FieldsAction.newField, (state,{field}) =>({
        ...state,
        selectedItem: field
    })),
);


export function reducer(state: State | undefined, action: Action) {
    return feildsReducer(state, action)
}