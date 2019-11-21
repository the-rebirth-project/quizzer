import React from 'react';
import { push } from 'connected-react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Overlay } from '../Overlay';
import { PositionedButtonContainer } from '../Overlay/styles';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../types';
import { PlayerTurnText, StyledNavBtn } from './styles';
import { mainTheme } from '../../themes';

interface RouteParams {
  playerId: string;
  nextQuestionPos: string;
}

export const TurnOverlay: React.FC<RouteComponentProps<
  RouteParams
>> = props => {
  const dispatch = useDispatch();
  const { playerId, nextQuestionPos } = props.match.params;
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const curPlayer = useSelector(
    (state: RootState) => state.scoreboard.players
  ).filter(p => p.id === parseInt(playerId))[0];

  const goToNext = (): void => {
    if (parseInt(nextQuestionPos) >= questions.length) {
      dispatch(push('/log'));
    } else {
      dispatch(push(`/start/q/${nextQuestionPos}`));
    }
  };

  return (
    <Overlay backgroundColor={mainTheme.colors.amethyst}>
      <PlayerTurnText>{curPlayer.pName}'s turn</PlayerTurnText>
      <PositionedButtonContainer onClick={goToNext} right>
        <StyledNavBtn icon={faLongArrowAltRight} />
      </PositionedButtonContainer>
    </Overlay>
  );
};
