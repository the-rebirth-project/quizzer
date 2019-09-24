import { createStandardAction } from 'typesafe-actions';
import { SAVE_EDITED_QUESTION, Question } from '../types';

export const saveEditedQuestion = createStandardAction(SAVE_EDITED_QUESTION)<
	Question
>();
