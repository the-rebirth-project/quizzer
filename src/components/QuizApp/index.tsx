import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import uuid from 'uuid/v4';

import { fetchQuestionsThunk } from '../../actions';
import he from 'he';

export const QuizApp: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quizApp.questions);

	const onButtonClick = (): void => {
		fetchQuestionsThunk(dispatch);
	};

	return (
		<div>
			<h1>Sample text</h1>
			<button onClick={onButtonClick}>Fetch Questions</button>
			{questions.map(q => (
				<li key={uuid()}>{he.decode(q.question)}</li>
			))}
		</div>
	);
};
