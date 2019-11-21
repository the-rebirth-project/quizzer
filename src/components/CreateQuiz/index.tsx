import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { arrayMove } from '../../helpers';
import { SortEnd } from 'react-sortable-hoc';
import { push } from 'connected-react-router';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { MiniQuestions } from './MiniQuestions';
import { SnackbarValidator } from '../SnackbarValidator';
import { Toolbar } from './Toolbar';
import { sortQuestion } from '../../actions/createQuizActions';
import { assignPlayerToQuestion, savePreset, showSnackbar } from '../../actions';
import { RootState } from '../../types';
import { NavBtnsContainer, ButtonContainer, NavBtn } from '../Layout/styles';
import {
  GreyBG,
  GlobalStyle,
  Root,
  Sidebar,
  CreateTitle,
  MiniQuestionsContainer
} from './styles';

export const CreateQuiz: React.FC = () => {
  const dispatch = useDispatch();
  const failedValidator = useSelector((state: RootState) => state.snackbar.failedValidator);
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const players = useSelector((state: RootState) => state.scoreboard.players);
  const curPresetId = useSelector((state: RootState) => state.quiz.curPresetId);
  const curPresetData = useSelector(
    (state: RootState) => state.quiz.presets
  ).filter(p => p.id === curPresetId)[0];

  const handleOnSortEnd = ({ oldIndex, newIndex }: SortEnd): void => {
    const sortedQuestions = arrayMove(oldIndex, newIndex, questions);
    dispatch(sortQuestion(sortedQuestions));
    players.length > 1 && dispatch(assignPlayerToQuestion(players));
  };

  const goLeft = (): void => {
    const saveAndGoToMenu = (): void => {
      dispatch(push('/'));
      const newPresetData = {
      ...curPresetData,
      questions
    };
    dispatch(
      savePreset({
        id: curPresetId,
        newPresetData
      })
      );
    }

    failedValidator ? dispatch(showSnackbar()) : saveAndGoToMenu();
  };

  return (
    <GreyBG>
      <GlobalStyle />

      <Root>
        <Sidebar>
          <Toolbar />
          <CreateTitle>Create</CreateTitle>
          <NavBtnsContainer>
            <ButtonContainer onClick={goLeft} left>
              <NavBtn icon={faLongArrowAltLeft} />
            </ButtonContainer>
          </NavBtnsContainer>
        </Sidebar>
        <MiniQuestionsContainer>
          <MiniQuestions
            distance={3}
            axis="y"
            lockAxis="y"
            onSortEnd={handleOnSortEnd}
          />
        </MiniQuestionsContainer>

        <SnackbarValidator validators={[{validateCondition: questions.length % players.length === 0, errorMessage: `Preset must have equal number of questions for each player`}]}/>
      </Root>
    </GreyBG>
  );
};
