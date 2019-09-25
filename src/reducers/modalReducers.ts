import { createReducer } from 'typesafe-actions';
import { openCreateModal, openEditModal } from '../actions';

interface IState {
	readonly createModalOpen: boolean;
	readonly editModalOpen: boolean;
}

const initialState: IState = {
	createModalOpen: false,
	editModalOpen: false
};

export const modalReducer = createReducer(initialState)
	.handleAction(openCreateModal, (state, _) => ({
		...state,
		createModalOpen: !state.createModalOpen
	}))
	.handleAction(openEditModal, (state, _) => ({
		...state,
		editModalOpen: !state.editModalOpen
	}));
