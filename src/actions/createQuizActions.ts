import { createStandardAction } from 'typesafe-actions';
import {
	SORT_QUESTION,
	ADD_PRESET,
	SAVE_PRESET,
	REMOVE_PRESET,
	QuizPreset,
	Question
} from '../types';

export const sortQuestion = createStandardAction(SORT_QUESTION)<Question[]>();
export const addPreset = createStandardAction(ADD_PRESET)<QuizPreset>();
export const savePreset = createStandardAction(SAVE_PRESET)<{
	id: string;
	newPresetData: QuizPreset;
}>();
export const removePreset = createStandardAction(REMOVE_PRESET)<string>(); // takes in presetId as arg
