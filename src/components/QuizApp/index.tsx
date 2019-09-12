import React from 'react';
import { useDispatch } from 'react-redux';
// import { RootState } from '../../types';
// import uuid from 'uuid/v4';
// import { fetchQuestionsThunk } from '../../actions';
// import he from 'he';
import { Root, Title, SubText, Left, Right, Button } from './styles';
import { Link } from 'react-router-dom';
import { startQuiz } from '../../actions';

export const QuizApp: React.FC = () => {
	const dispatch = useDispatch();
	// const questions = useSelector((state: RootState) => state.quizApp.questions);

	// const onButtonClick = (): void => {
	// 	fetchQuestionsThunk(dispatch);
	// };
	return (
		<Root>
			<Left>
				<Title>Trivia Quiz</Title>
				<SubText>An app for designing and participating in quizzes</SubText>
				{/* <button onClick={onButtonClick}>Fetch Questions</button>
				{questions.map(q => (
					<li key={uuid()}>{he.decode(q.question)}</li>
				))} */}
			</Left>

			<Right>
				<Link to="/start/q/1">
					<Button primary onClick={() => dispatch(startQuiz())}>
						Start
					</Button>
				</Link>
				<Button>Rules</Button>
				<Button>About </Button>
			</Right>
		</Root>
	);
};
