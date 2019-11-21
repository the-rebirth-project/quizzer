import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarWrapper } from '../SnackbarWrapper';
import { makeStyles, Theme } from '@material-ui/core';
import { updateFailedValidator, hideSnackbar } from '../../actions';
import { RootState, Validator } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

interface ValidatorProps {
  validators: Validator[];
}

/**
 * Checks for any validators with condition set to false (false means validation failed)
 */

export const SnackbarValidator: React.FC<ValidatorProps> = ({ validators }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const snackbarOpen = useSelector(
    (state: RootState) => state.snackbar.snackbarOpen
  );
  const failedValidator = validators.filter(
    v => v.validateCondition === false
  )[0];
  const errorMessage = failedValidator ? failedValidator.errorMessage : '';

  const handleSnackbarClose = (e: React.SyntheticEvent<any, Event>, reason: string): void => {
    reason !== 'clickaway' && dispatch(hideSnackbar());
  };

  useEffect(() => {
    dispatch(updateFailedValidator(failedValidator));
  }, [ dispatch, failedValidator ])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <SnackbarWrapper
        variant="error"
        className={classes.margin}
        message={errorMessage}
      />
    </Snackbar>
  );
};
