import { createStandardAction } from 'typesafe-actions';
import { SHOW_MODAL } from '../types';

export const showModal = createStandardAction(SHOW_MODAL)<undefined>();
