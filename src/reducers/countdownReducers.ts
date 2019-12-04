import { createReducer } from 'typesafe-actions';
import {
  startCountdown,
  pauseCountdown,
  setCountdownComplete,
  updateCount
} from '../actions';

interface IState {
  isPaused: boolean;
  countdownComplete: boolean;
  count: number;
}

const initialState: IState = {
  isPaused: false,
  countdownComplete: false,
  count: 0
};

export const countdownReducer = createReducer(initialState)
  .handleAction(pauseCountdown, (state, _) => ({
    ...state,
    isPaused: true
  }))
  .handleAction(startCountdown, (state, _) => ({
    ...state,
    isPaused: false,
    countdownComplete: false
  }))
  .handleAction(setCountdownComplete, (state, action) => ({
    ...state,
    countdownComplete: action.payload
  }))
  .handleAction(updateCount, (state, action) => ({
    ...state,
    count: action.payload
  }));
