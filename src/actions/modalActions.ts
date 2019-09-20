import { createStandardAction } from 'typesafe-actions';
import { OPEN_CREATE_MODAL } from '../types';

export const openModal = createStandardAction(OPEN_CREATE_MODAL)<undefined>();
