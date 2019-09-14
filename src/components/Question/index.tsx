import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
	const { question, options } = questions[questionNum];

	const transitions = useTransition(questionNum, p => p, {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
	});

	const renderQuestion = (): JSX.Element => {
		// question is returned in encoded format (HTML encoding). we have to decode it before returning
		return (
			<div>
				{questionNum + 1}. {he.decode(question)}
			</div>
		);
	};

	const renderOptions = (): JSX.Element[] => {
		return options.map(option => (
			<Option to={`/start/q/${questionNum + 1}`}>{he.decode(option)}</Option>
		));
	};

	return (
		<div>
			{transitions.map(({ props, key }) => (
				<Root key={key} style={props}>
					<QuestionWrapper>{renderQuestion()}</QuestionWrapper>
					<OptionsWrapper>{renderOptions()}</OptionsWrapper>
					{console.log(router, dispatch)}
				</Root>
			))}
		</div>
	);
};
