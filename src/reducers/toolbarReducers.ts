import { createReducer } from 'typesafe-actions';
import { editMode, deleteMode } from '../actions';

interface IState {
	[index: string]: any;
	readonly editModeState: boolean;
	readonly deleteModeState: boolean;
}

const initialState: IState = {
	editModeState: false,
	deleteModeState: false
};

// should be called each time an action for enabling a tool is dispatched.
// this function disables every tool which is enabled i.e set to true
const disableOtherTools = (state: IState): void => {
	// eslint-disable-next-line
	Object.keys(state).map(key => {
		if (state[key] === true) state[key] = false;
	});
};

// code may get messy as the toolbar scales to more tools. might want to find a better solution for this one
export const toolbarReducer = createReducer(initialState)
	.handleAction(editMode, (state, action) => {
		disableOtherTools(state);
		return {
			...state,
			editModeState: action.payload === 'ON' ? true : false
		};
	})
	.handleAction(deleteMode, (state, action) => {
		disableOtherTools(state);
		return {
			...state,
			deleteModeState: action.payload === 'ON' ? true : false
		};
	});
