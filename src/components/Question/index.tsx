import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { validateChoice, rehydrateState } from '../../actions';
import { useTransition } from 'react-spring';
import { Root, QuestionWrapper, OptionsWrapper, Option } from './styles';
import he from 'he';
import uuid from 'uuid/v4';
import { push } from 'connected-react-router';

interface RouteParams {
	qId: string;
}

export const Question: React.FC<RouteComponentProps<RouteParams>> = props => {
	const dispatch = useDispatch();
	const choiceValid = useSelector(
		(state: RootState) => state.question.choiceValid
	);
	const questionNum = parseInt(props.match.params.qId);
	const questions = useSelector((state: RootState) => state.menu.questions);
	const started = useSelector((state: RootState) => state.menu.started);
	const qData = questions[questionNum];
	const { question, options } = qData;

	useEffect(() => {
		dispatch(rehydrateState()); // sets choiceValid back to null after each question
	}, [dispatch, questionNum]);

	const transitions = useTransition(questionNum, p => p, {
		initial: { opacity: 0 },
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

	// we could have a validateChoice action which validates the chosen option comparing it to the correct answer and based on that update a state in Question state tree and display the appropriate message

	const onOptionClick = (option: string): void => {
		dispatch(
			validateChoice({ choice: option, correctAnswer: qData.correct_answer })
		);
		setTimeout(() => {
			dispatch(push(`/start/q/${questionNum + 1}`));
		}, 1500);
	};

	const renderOptions = (): JSX.Element[] => {
		return options.map(option => (
			<Option
				disabled={choiceValid !== null}
				key={uuid()}
				onClick={() => onOptionClick(option)}
			>
				{he.decode(option)}
			</Option>
		));
	};

	return (
		<div>
			{transitions.map(({ props, key }) => (
				<Root key={key} style={props}>
					<QuestionWrapper started={started}>
						{renderQuestion()}
					</QuestionWrapper>
					<OptionsWrapper started={started}>{renderOptions()}</OptionsWrapper>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							zIndex: 20
						}}
					>
						{choiceValid && choiceValid !== null && <h1>Correct Answer!</h1>}
						{!choiceValid && choiceValid !== null && <h1>Incorrect Answer!</h1>}
					</div>
				</Root>
			))}
		</div>
	);
};
