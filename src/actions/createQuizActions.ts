import { createStandardAction } from 'typesafe-actions';
import { SORT_QUESTION, SAVE_PRESET, QuizPreset, Question } from '../types';

export const sortQuestion = createStandardAction(SORT_QUESTION)<Question[]>();
export const savePreset = createStandardAction(SAVE_PRESET)<QuizPreset>();
