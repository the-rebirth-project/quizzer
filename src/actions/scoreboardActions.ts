import { createStandardAction } from 'typesafe-actions';
import {
	Player,
	UPDATE_SCORE,
	UPDATE_PLAYER_NAME,
	ADD_PLAYER,
	REMOVE_PLAYER,
	RESET_SCORE
} from '../types';

export const updateScore = createStandardAction(UPDATE_SCORE)<{
	score: number;
	id: number;
}>();

export const updatePlayerName = createStandardAction(UPDATE_PLAYER_NAME)<{
	id: number;
	newName: string;
}>();

export const addPlayer = createStandardAction(ADD_PLAYER)<Player>();
// uses player id to figure out which player to remove
export const removePlayer = createStandardAction(REMOVE_PLAYER)<number>();
export const resetScore = createStandardAction(RESET_SCORE)<undefined>();
