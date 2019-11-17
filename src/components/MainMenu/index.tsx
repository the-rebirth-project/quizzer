import React from 'react';
import { useNavigation } from 'react-navi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-navi';
import { startQuiz } from '../../actions';
import { Root, Title, SubText, Left, Right, Button } from './styles';

export const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onThinkBtnClick = (): void => {
    dispatch(startQuiz());
    navigation.navigate('/start/q/0');
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
        <Link href="/create">
          <Button>Create</Button>
        </Link>
        <Link href="/configure/1">
          <Button>Configure</Button>
        </Link>
        <Button>Explore</Button>
      </Right>
    </Root>
  );
};
