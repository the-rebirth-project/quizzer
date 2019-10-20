import { createStandardAction } from 'typesafe-actions';

export const updateScore = createStandardAction('UPDATE_SCORE')<{
	score: number;
	id: number;
}>();
