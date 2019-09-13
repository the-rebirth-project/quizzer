import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { useTransition } from 'react-spring';
import { Root, QuestionWrapper, OptionsWrapper, Option } from './styles';
import he from 'he';

export const Question: React.FC = () => {
	const dispatch = useDispatch();
	const router = useSelector((state: RootState) => state.router);
	const started = useSelector((state: RootState) => state.quizApp.started);
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
