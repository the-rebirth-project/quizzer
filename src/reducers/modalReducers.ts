import { createReducer } from 'typesafe-actions';
import { showModal } from '../actions';

interface IState {
	readonly modalShown: boolean;
}

const initialState: IState = {
	modalShown: false
};

export const modalReducer = createReducer(initialState).handleAction(
	showModal,
	(state, _) => ({
		...state,
		modalShown: !state.modalShown
	})
);
