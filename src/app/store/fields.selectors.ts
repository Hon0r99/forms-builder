import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./fields.reducer";

export namespace FieldsSelectors {
    export const state = createFeatureSelector<State>('fields');

    export const droppedItems = createSelector(state, (state) => state.droppedItems)
    export const selectedItem = createSelector(state, (state) => state.selectedItem)
    export const user = createSelector(state, (state) => state.user)
}