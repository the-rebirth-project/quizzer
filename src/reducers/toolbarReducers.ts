import { createReducer } from 'typesafe-actions';
import { editMode } from '../actions';

interface IState {
	readonly editMode: boolean;
}

const initialState: IState = {
	editMode: false
};

export const toolbarReducer = createReducer(initialState).handleAction(
	editMode,
	(state, action) => ({
		...state,
		editMode: action.payload === 'ON' ? true : false
	})
);
