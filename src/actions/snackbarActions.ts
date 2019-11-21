import { createStandardAction } from 'typesafe-actions';
import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  UPDATE_FAILED_VALIDATOR,
  Validator
} from '../types';

export const showSnackbar = createStandardAction(SHOW_SNACKBAR)<undefined>();
export const hideSnackbar = createStandardAction(HIDE_SNACKBAR)<undefined>();
export const updateFailedValidator = createStandardAction(
  UPDATE_FAILED_VALIDATOR
)<Validator>();
