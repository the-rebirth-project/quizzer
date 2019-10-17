import { createStandardAction } from 'typesafe-actions';
import { EDIT_MODE, DELETE_MODE } from '../types';

export const editMode = createStandardAction(EDIT_MODE)<'ON' | 'OFF'>();
export const deleteMode = createStandardAction(DELETE_MODE)<'ON' | 'OFF'>();
