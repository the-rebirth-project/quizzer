import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from 'react-navi';
import { arrayMove } from '../../helpers';
import { SortEnd } from 'react-sortable-hoc';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { MiniQuestions } from './MiniQuestions';
import { Toolbar } from './Toolbar';
import { sortQuestion } from '../../actions/createQuizActions';
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
  const navigation = useNavigation();
  const questions = useSelector((state: RootState) => state.quiz.questions);

  const handleOnSortEnd = ({ oldIndex, newIndex }: SortEnd): void => {
    const sortedQuestions = arrayMove(oldIndex, newIndex, questions);
    dispatch(sortQuestion(sortedQuestions));
  };

  const goLeft = (): void => {
    navigation.navigate('/');
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
      </Root>
    </GreyBG>
  );
};
