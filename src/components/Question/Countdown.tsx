import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { Root } from './countdownStyles';
import { setCountdownComplete, updateCount } from '../../actions';

interface CountdownProps {
  timer: number;
  onComplete?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ timer, onComplete }) => {
  const dispatch = useDispatch();
  const [countState, setCountState] = useState(timer);
  const isPaused = useSelector((state: RootState) => state.countdown.isPaused);
  const shouldIncrementCount = !isPaused && countState !== 0;

  useEffect(() => {
    if (countState === 0) {
      dispatch(setCountdownComplete(true));
      dispatch(updateCount(countState));
      onComplete && onComplete();
    }
    shouldIncrementCount &&
      setTimeout(() => setCountState(countState - 1), 1000);
  }, [dispatch, onComplete, shouldIncrementCount, countState, timer, isPaused]);

  return <Root>{countState}</Root>;
};
