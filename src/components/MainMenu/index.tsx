import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SnackbarValidator } from '../SnackbarValidator';
import { startQuiz, showSnackbar } from '../../actions';
import { RootState } from '../../types';
import { Root, Title, SubText, Left, Right, Button } from './styles';

export const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const failedValidator = useSelector((state: RootState) => state.snackbar.failedValidator);
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const players = useSelector((state: RootState) => state.scoreboard.players);

  const onThinkBtnClick = (): void => {
    if (failedValidator) {
      dispatch(showSnackbar());
    } else {
      dispatch(startQuiz());
      dispatch(push('/start/q/0'));
    }
  };

  return (
    <Root>
      <Left>
        <Title>Quizzer</Title>
        <SubText>An app for designing and participating in quizzes</SubText>
      </Left>

      <Right>
        <Button primary onClick={onThinkBtnClick}>
          Think
        </Button>
        <Link to="/create">
          <Button>Create</Button>
        </Link>
        <Link to="/configure">
          <Button>Configure</Button>
        </Link>
        <Button>Explore</Button>
      </Right>

      <SnackbarValidator validators={[{validateCondition: questions.length % players.length === 0, errorMessage: 'Preset must have equal questions for each player'}]} />
    </Root>
  );
};
