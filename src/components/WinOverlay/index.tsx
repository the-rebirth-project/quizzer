import React from 'react';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Overlay } from '../Overlay';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../types';
import { NavBtn } from '../Layout/styles';
import { PositionedButtonContainer } from '../Overlay/styles';
import { FinalPoints, WonText } from './styles';
import { mainTheme } from '../../themes';

export const WinOverlay: React.FC = () => {
  const dispatch = useDispatch();
  const firstPlayer = useSelector(
    (state: RootState) => state.scoreboard.playerRankingPositions
  )[0];

  const goToLog = (): void => {
    dispatch(push('/log'));
  };

  return (
    <Overlay backgroundColor={mainTheme.colors.primary}>
      <WonText>
        {firstPlayer.pName} won with{' '}
        <FinalPoints>{firstPlayer.score} points</FinalPoints>
      </WonText>
      <PositionedButtonContainer onClick={goToLog} right>
        <NavBtn icon={faLongArrowAltRight} fontSize={6} />
      </PositionedButtonContainer>
    </Overlay>
  );
};
