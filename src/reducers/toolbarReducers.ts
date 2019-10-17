import { createReducer } from 'typesafe-actions';
import { editMode, deleteMode } from '../actions';

interface IState {
	readonly editModeState: boolean;
	readonly deleteModeState: boolean;
}

const initialState: IState = {
	editModeState: false,
	deleteModeState: false
};

// code may get messy as the toolbar scales to more tools. might want to find a better solution for this one
export const toolbarReducer = createReducer(initialState)
	.handleAction(editMode, (state, action) => ({
		deleteModeState: action.payload === 'ON' ? false : state.deleteModeState,
		editModeState: action.payload === 'ON' ? true : false
	}))
	.handleAction(deleteMode, (state, action) => ({
		editModeState: action.payload === 'ON' ? false : state.editModeState,
		deleteModeState: action.payload === 'ON' ? true : false
	}));
