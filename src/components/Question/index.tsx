import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown-now';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import UIfx from 'uifx';
import { Link } from 'react-router-dom';
import { RootState } from '../../types';
import { validateChoice, rehydrateState } from '../../actions';
import {
	Root,
	QuestionWrapper,
	OptionsWrapper,
	Option,
	Qnum,
	Timer,
	TimeoutOverlay,
	FeedbackContainer
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
		setTimedOut(false);
		dispatch(rehydrateState()); // sets choiceValid back to null after each question
	}, [dispatch, questionNum]);

	const transitions = useTransition(questionNum, p => p, {
		initial: { opacity: 0 },
		from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
	});

	const feedbackContainerTransition = useTransition(choiceValid, null, {
		initial: { opacity: 0 },
		from: { transform: 'scale(0)' },
		enter: { transform: 'scale(1)' },
		leave: { opacity: 0, transform: 'scale(0)' },
		config: { tension: 250 }
	});

	const renderQuestion = (): JSX.Element => {
		// question is returned in encoded format (HTML encoding). we have to decode it before returning
		return (
			<div>
				<Qnum>{questionNum + 1}.</Qnum> {question}
			</div>
		);
	};

	const onOptionClick = (option: string): void => {
		// a small delay for validating choice here to provide a sense of tension
		setTimeout(() => {
			dispatch(
				validateChoice({ choice: option, correctAnswer: qData.correct_answer })
			);

			if (option === qData.correct_answer) {
				const correctSfx = require('../../sfx/correctsfx.mp3');
				const correct = new UIfx(correctSfx, {
					volume: 1,
					throttleMs: 100
				});
				correct.play();
			} else {
				const incorrectSfx = require('../../sfx/incorrectsfx.mp3');
				const incorrect = new UIfx(incorrectSfx, {
					volume: 1,
					throttleMs: 100
				});
				incorrect.play();
			}

			setTimeout(() => {
				// if all the questions are exhausted, user is forced back to menu
				if (questionNum > questions.length - 1) {
					dispatch(push('/'));
				} else {
					dispatch(push(`/start/q/${questionNum + 1}`));
				}
			}, 1500);
		}, 500);
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
		// validateChoice would always return false here. kind of a hacky way of doing it
		dispatch(validateChoice({ choice: 'timeout', correctAnswer: '' }));
		setTimeout(() => {
			dispatch(push(`/start/q/${questionNum + 1}`));
		}, 2500);
	};

	const timerRenderer = ({
		minutes,
		seconds,
		completed
	}: {
		minutes: number;
		seconds: number;
		completed: boolean;
	}): JSX.Element => {
		if (completed) {
			return <TimeoutOverlay completed={completed}>Time Out!</TimeoutOverlay>;
		} else {
			return <Timer>{`${minutes}: ${seconds}`}</Timer>;
		}
	};

	return (
		<div>
			{transitions.map(({ props, key }) => (
				<Root key={key} style={props}>
					<Link
						to="/"
						style={{
							position: 'absolute',
							top: '10%',
							right: '10%',
							zIndex: 40
						}}
					>
						Home
					</Link>
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
						{feedbackContainerTransition.map(
							({ item, props, key }) =>
								item !== null && (
									<FeedbackContainer
										key={key}
										style={props}
										choiceValid={choiceValid}
									>
										{choiceValid ? (
											<FontAwesomeIcon icon={faCheck} />
										) : (
											<FontAwesomeIcon icon={faTimes} />
										)}
									</FeedbackContainer>
								)
						)}
						{qData.modifiers.timed && (
							<>
								<Countdown
									date={Date.now() + qData.timer * 1000}
									renderer={timerRenderer}
									onComplete={onTimeout}
								/>
								{timedOut && (
									<TimeoutOverlay completed={timedOut}>
										Time out!
									</TimeoutOverlay>
								)}
							</>
						)}
					</div>
				</Root>
			))}
		</div>
	);
};
