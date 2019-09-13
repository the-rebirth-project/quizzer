import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { useTransition } from 'react-spring';
import { Root, QuestionWrapper, OptionsWrapper, Option } from './styles';
import he from 'he';

interface RouteParams {
	qId: string;
}

export const Question: React.FC<RouteComponentProps<RouteParams>> = props => {
	const dispatch = useDispatch();
	const router = useSelector((state: RootState) => state.router);
	const started = useSelector((state: RootState) => state.quizApp.started);
	const questionNum = parseInt(props.match.params.qId);
	const questions = useSelector((state: RootState) => state.quizApp.questions);
	const questionData = questions[questionNum]; // fetches the required question object

	// Durstenfeld Shuffle Algorithm. Maybe move this to a separate helper function file?
	const shuffleArray = (arr: any[]): any[] => {
		for (let i = arr.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}

		return arr;
	};

	const options: string[] = shuffleArray([
		...questionData.incorrect_answers,
		questionData.correct_answer
	]);

	const transitions = useTransition(started, null, {
		from: {
			opacity: 0
		},
		enter: {
			opacity: 1
		},
		config: { tension: 100 }
	});

	const renderQuestion = (): JSX.Element => {
		// question is returned in encoded format (HTML encoding). we have to decode it before returning
		return (
			<div>
				{questionNum + 1}. {he.decode(questionData.question)}
			</div>
		);
	};

	const renderOptions = (): JSX.Element[] => {
		return options.map(option => (
			<Option>
				<Link to={`/start/q/${questionNum + 1}`}>{option}</Link>
			</Option>
		));
	};

	return (
		<div>
			{transitions.map(({ props }) => (
				<Root style={props}>
					<QuestionWrapper>{renderQuestion()}</QuestionWrapper>
					<OptionsWrapper>{renderOptions()}</OptionsWrapper>
					{console.log(router, dispatch)}
				</Root>
			))}
		</div>
	);
};
