import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '../Layout';
import { push } from 'connected-react-router';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { setPlayerRanking } from '../../actions';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../types';
import { Score, Points, ScoreboardTitle } from './styles';
import {
  LeftContainer,
  RightContainer,
  NavBtnsContainer,
  NavBtn,
  ButtonContainer,
  SectionContainer
} from '../Layout/styles';

/** RULES
 * Provide props to component describing how many players are participating
 * +3 points for every correct answer (possibly implement a solution where points are awarded based on completion time)
 * -1 points for every incorrect answer or time out
 */

// HORRIBLE CODE. I KNOW.

interface RouteParams {
  nextQuestionNum: string;
}

export const Scoreboard: React.FC<RouteComponentProps<RouteParams>> = props => {
  const nextQuestionNum = parseInt(props.match.params.nextQuestionNum);
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.scoreboard.players);
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const firstPlayer = players.reduce((prevPlayer, player) => {
    return prevPlayer.score > player.score ? prevPlayer : player;
  });
  const lastPlayer = players.reduce((prevPlayer, player) => {
    return prevPlayer.score < player.score ? prevPlayer : player;
  });
  const sortedPlayers = [
    firstPlayer,
    ...players.filter(t => t !== firstPlayer && t !== lastPlayer),
    lastPlayer
  ];

  useEffect(() => {
    dispatch(setPlayerRanking(sortedPlayers));
  }, [sortedPlayers, dispatch]);

  const goToNextQuestion = (): void => {
    const nextQuestion = questions[nextQuestionNum];
    if (players.length > 1) {
      dispatch(
        push(`/playerturn/${nextQuestion.player.id}/${nextQuestionNum}`)
      );
    } else {
      dispatch(push(`/start/q/${nextQuestionNum}`));
    }
  };

  return (
    <Layout pageUrl="/scoreboard">
        <LeftContainer>
          <ScoreboardTitle>Scoreboard</ScoreboardTitle>
          <NavBtnsContainer>
            <ButtonContainer
              style={{ justifySelf: 'flex-end' }}
              onClick={goToNextQuestion}
              right
            >
              <NavBtn icon={faLongArrowAltRight} />
            </ButtonContainer>
          </NavBtnsContainer>
        </LeftContainer>
        <RightContainer>
          <SectionContainer>
            {players.length > 2 &&
              players.reduce((prevP, p) =>
                prevP.score === p.score ? prevP : p
              ) !== players[0] &&
              sortedPlayers.map((p, i) => {
                // if index is 0
                if (i === 0) {
                  return (
                    <Score first>
                      {p.pName}: <Points>{p.score}</Points>
                    </Score>
                  );
                } else if (i === sortedPlayers.length - 1) {
                  // if last index
                  return (
                    <Score last>
                      {p.pName}: <Points>{p.score}</Points>
                    </Score>
                  );
                } else {
                  // if any indices between first and last
                  return (
                    <Score>
                      {p.pName}: <Points>{p.score}</Points>
                    </Score>
                  );
                }
              })}
            {players.length >= 2 &&
              players.reduce((prevP, p) =>
                prevP.score === p.score ? prevP : p
              ) === players[0] && (
                <>
                  {players.map(p => (
                    <Score>
                      {p.pName}: <Points>{p.score}</Points>
                    </Score>
                  ))}
                </>
              )}
            {players.length === 1 && (
              <Score>
                {players[0].pName}: <Points>{players[0].score}</Points>
              </Score>
            )}
            {players.length === 2 &&
              players.reduce((prevP, p) =>
                prevP.score === p.score ? prevP : p
              ) !== players[0] && (
                <>
                  {players[0].score > players[1].score && (
                    <>
                      <Score first>
                        {players[0].pName}: <Points>{players[0].score}</Points>
                      </Score>
                      <Score last>
                        {players[1].pName}: <Points>{players[1].score}</Points>
                      </Score>
                    </>
                  )}
                  {players[1].score > players[0].score && (
                    <>
                      <Score first>
                        {players[1].pName}: <Points>{players[1].score}</Points>
                      </Score>
                      <Score last>
                        {players[0].pName}: <Points>{players[0].score}</Points>
                      </Score>
                    </>
                  )}
                </>
              )}
          </SectionContainer>
        </RightContainer>
    </Layout>
  );
};
