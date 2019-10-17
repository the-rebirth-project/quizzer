import { createStandardAction } from 'typesafe-actions';
import { VALIDATE_CHOICE, DELETE_QUESTION, REHYDRATE_STATE } from '../types';

export const validateChoice = createStandardAction(VALIDATE_CHOICE)<{
	choice: string;
	correctAnswer: string;
}>();

// accepts id of question as argument
export const deleteQuestion = createStandardAction(DELETE_QUESTION)<string>();

export const rehydrateState = createStandardAction(REHYDRATE_STATE)<
	undefined
>();
