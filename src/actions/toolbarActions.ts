import { createStandardAction } from 'typesafe-actions';
import { EDIT_MODE } from '../types';

export const editMode = createStandardAction(EDIT_MODE)<'ON' | 'OFF'>();
