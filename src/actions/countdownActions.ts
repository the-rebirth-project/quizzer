import { createStandardAction } from 'typesafe-actions';
import {
  PAUSE_COUNTDOWN,
  START_COUNTDOWN,
  SET_COUNTDOWN_COMPLETE,
  UPDATE_COUNT
} from '../types';

export const pauseCountdown = createStandardAction(PAUSE_COUNTDOWN)<
  undefined
>();
export const startCountdown = createStandardAction(START_COUNTDOWN)<
  undefined
>();
export const setCountdownComplete = createStandardAction(
  SET_COUNTDOWN_COMPLETE
)<boolean>();
export const updateCount = createStandardAction(UPDATE_COUNT)<number>();
