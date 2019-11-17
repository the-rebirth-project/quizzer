import React from 'react';
import { useNavigation, useCurrentRoute } from 'react-navi';
import { Route } from 'navi';
import { useSelector } from 'react-redux';
import { Overlay } from '../Overlay';
import { PositionedButtonContainer } from '../Overlay/styles';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../types';
import { PlayerTurnText, StyledNavBtn } from './styles';
import { mainTheme } from '../../themes';

interface RouteData {
  urlParams: {
    playerId: string;
    nextQuestionPos: string;
  };
}

export const TurnOverlay: React.FC = () => {
  const navigation = useNavigation();
  const route: Route<RouteData> = useCurrentRoute();
  const { playerId, nextQuestionPos } = route.data
    ? route.data.urlParams
    : { playerId: '', nextQuestionPos: '' };
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const curPlayer = useSelector(
    (state: RootState) => state.scoreboard.players
  ).filter(p => p.id === parseInt(playerId))[0];

  const goToNext = (): void => {
    if (parseInt(nextQuestionPos) >= questions.length) {
      navigation.navigate('/log');
    } else {
      navigation.navigate(`/start/q/${nextQuestionPos}`);
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
