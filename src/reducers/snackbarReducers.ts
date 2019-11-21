import { createReducer } from 'typesafe-actions';
import { showSnackbar, hideSnackbar, updateFailedValidator } from '../actions';
import { Validator } from '../types';

interface IState {
  readonly snackbarOpen: boolean;
  readonly failedValidator: Validator | undefined;
}

const initialState: IState = {
  snackbarOpen: false,
  failedValidator: undefined
};

export const snackbarReducer = createReducer(initialState)
  .handleAction(showSnackbar, (state, _) => ({
    ...state,
    snackbarOpen: true
  }))
  .handleAction(hideSnackbar, (state, _) => ({
    ...state,
    snackbarOpen: false
  }))
  .handleAction(updateFailedValidator, (state, action) => ({
    ...state,
    failedValidator: action.payload
  }));
