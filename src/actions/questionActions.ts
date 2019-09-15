import { createStandardAction } from 'typesafe-actions';
import { VALIDATE_CHOICE, REHYDRATE_STATE } from '../types';

export const validateChoice = createStandardAction(VALIDATE_CHOICE)<{
	choice: string;
	correctAnswer: string;
}>();

export const rehydrateState = createStandardAction(REHYDRATE_STATE)<
	undefined
>();
