import { createStandardAction } from 'typesafe-actions';
import { Question, LOG_USER_CHOICE, CLEAR_LOG } from '../types';

interface logUserChoicePayload extends Question {
  qNum: number;
  userChoice: string | number;
  calculatedScore: number;
}

export const logUserChoice = createStandardAction(LOG_USER_CHOICE)<
  logUserChoicePayload
>();

export const clearLog = createStandardAction(CLEAR_LOG)<undefined>();
