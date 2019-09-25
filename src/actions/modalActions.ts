import { createStandardAction } from 'typesafe-actions';
import { OPEN_CREATE_MODAL, OPEN_EDIT_MODAL } from '../types';

export const openCreateModal = createStandardAction(OPEN_CREATE_MODAL)<
	undefined
>();
export const openEditModal = createStandardAction(OPEN_EDIT_MODAL)<undefined>();
