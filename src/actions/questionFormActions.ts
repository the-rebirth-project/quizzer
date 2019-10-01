import { createStandardAction } from 'typesafe-actions';
import {
	SAVE_EDITED_QUESTION,
	CREATE_CUSTOM_QUESTION,
	Question
} from '../types';

export const createCustomQuestion = createStandardAction(
	CREATE_CUSTOM_QUESTION
)<Question>();

export const saveEditedQuestion = createStandardAction(SAVE_EDITED_QUESTION)<
	Question
>();
