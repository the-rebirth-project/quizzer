import { createStandardAction } from 'typesafe-actions';

export const updateScore = createStandardAction('UPDATE_SCORE')<{
	newScore: number;
	id: number;
}>();
