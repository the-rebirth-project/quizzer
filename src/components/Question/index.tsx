import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown-now';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { validateChoice, rehydrateState } from '../../actions';
import { useTransition } from 'react-spring';
import {
	Root,
	QuestionWrapper,
	OptionsWrapper,
	Option,
	Qnum,
	Timer
} from './styles';
import uuid from 'uuid/v4';
import { push } from 'connected-react-router';

interface RouteParams {
	qId: string;
}

export const Question: React.FC<RouteComponentProps<RouteParams>> = props => {
	const dispatch = useDispatch();
	const [timedOut, setTimedOut] = useState(false);
	const choiceValid = useSelector(
		(state: RootState) => state.question.choiceValid
	);
	const questionNum = parseInt(props.match.params.qId);
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const started = useSelector((state: RootState) => state.quiz.started);
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
				<Qnum>{questionNum + 1}.</Qnum> {question}
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

	// If any of the options are undefined, simply return false i.e we don't return anything.
	// This is to prevent blank options being rendered when the question does not have exactly 4 or 2 options as expected
	const renderOptions = (): (JSX.Element | false)[] => {
		return options.map(
			option =>
				option !== undefined && (
					<Option
						disabled={choiceValid !== null}
						key={uuid()}
						onClick={() => onOptionClick(option)}
					>
						{option}
					</Option>
				)
		);
	};

	const onTimeout = (): void => {
		setTimedOut(true);
		dispatch(validateChoice({ choice: 'timeout', correctAnswer: '' }));
	};

	const timerRenderer = ({
		seconds,
		completed
	}: {
		seconds: number;
		completed: boolean;
	}): JSX.Element => {
		if (completed) {
			return <h1>Time Out!</h1>;
		} else {
			return <Timer completed={completed}>{seconds}</Timer>;
		}
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
						{!timedOut && (
							<div>
								{choiceValid && choiceValid !== null && (
									<h1>Correct Answer!</h1>
								)}
								{!choiceValid && choiceValid !== null && (
									<h1>Incorrect Answer!</h1>
								)}
							</div>
						)}
						{qData.modifiers.timed && (
							<Countdown
								date={Date.now() + qData.timer * 1000}
								renderer={timerRenderer}
								onComplete={onTimeout}
							/>
						)}
					</div>
				</Root>
			))}
		</div>
	);
};
