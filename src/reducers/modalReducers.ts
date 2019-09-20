import { createReducer } from 'typesafe-actions';
import { openModal } from '../actions';

interface IState {
	readonly open: boolean;
}

const initialState: IState = {
	open: false
};

export const modalReducer = createReducer(initialState).handleAction(
	openModal,
	(state, _) => ({
		...state,
		open: !state.open
	})
);
