import { createStandardAction } from 'typesafe-actions';
import { SORT_QUESTION, Question } from '../types';

export const sortQuestion = createStandardAction(SORT_QUESTION)<Question[]>();
