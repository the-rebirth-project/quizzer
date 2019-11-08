import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown-now';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import UIfx from 'uifx';
import { Link } from 'react-router-dom';
import { Scoreboard } from './Scoreboard';
import { RootState } from '../../types';
import {
	validateChoice,
	rehydrateState,
	updateScore,
	logUserChoice
} from '../../actions';
import {
	Root,
	QuestionWrapper,
	OptionsWrapper,
	Option,
	Qnum,
	Timer,
	TimeoutOverlay,
	CenterContainer,
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
	const [scoreboardShown, setScoreboardShown] = useState(false);
	const [countdownPaused, setCountdownPaused] = useState(false);
	const choiceValid = useSelector(
		(state: RootState) => state.question.choiceValid
	);
	const players = useSelector((state: RootState) => state.scoreboard.players);
	const questionNum = parseInt(props.match.params.qId);
	const quizPresets = useSelector((state: RootState) => state.quiz.presets);
	// gets the chosen preset id from config form
	const curPresetId = useSelector((state: RootState) => state.quiz.curPresetId);
	// selects the appropriate preset based on chosen id
	const curPreset = quizPresets.filter(p => p.id === curPresetId)[0];
	const { questions } = curPreset;
	const started = useSelector((state: RootState) => state.quiz.started);
	const qData = questions[questionNum];
	const { question, options } = qData;

	useEffect(() => {
		setTimedOut(false);
		setScoreboardShown(false);
		dispatch(rehydrateState()); // sets choiceValid back to null after each question
	}, [dispatch, questionNum]);

	useEffect(() => {
		questions.map((q, i) => {
			// NOTE: THIS CODE BREAKS IF NUMBER OF PLAYERS EXCEEDS 4.
			const prevQuestion = questions[i - 1];
			let playerI: number = 0;
			if (prevQuestion) playerI = players.indexOf(questions[i - 1].player);
			const numOfIndices = players.length - 1;
			// we're brute handling all edge cases here. maybe try implementing a better solution?
			if (!prevQuestion) {
				q.player = players[0];
			} else if (numOfIndices - playerI === 1) {
				q.player = players[numOfIndices];
			} else if (playerI === 0) {
				q.player = players[playerI + 1];
			} else {
				q.player = players[numOfIndices - playerI];
			}

			if (players.length === 1) q.player = players[0];

			return {
				...q
			};
		});
		// eslint-disable-next-line
	}, [questions, players]);

	const transitions = useTransition(questionNum, p => p, {
		initial: { opacity: 0 },
		from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
	});

	const scoreboardTransition = useTransition(scoreboardShown, null, {
		initial: { opacity: 0 },
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: { duration: 0 }
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

	const goToNext = (): void => {
		setTimeout(() => {
			// if all the questions are exhausted, user is forced back to menu
			if (questionNum >= questions.length - 1) {
				dispatch(push('/log'));
			} else {
				dispatch(push(`/start/q/${questionNum + 1}`));
			}
			setScoreboardShown(false);
		}, 7500);
	};

	const onOptionClick = (option: string): void => {
		setCountdownPaused(true);
		const logUserChoicePayload = {
			...qData,
			qNum: questionNum + 1,
			userChoice: option
		};
		// as you can guess, this action logs stuff for later use in the log component
		dispatch(logUserChoice(logUserChoicePayload));
		// a small delay for validating choice here to provide a sense of tension
		setTimeout(() => {
			dispatch(
				validateChoice({ choice: option, correctAnswer: qData.correct_answer })
			);

			if (option === qData.correct_answer) {
				dispatch(updateScore({ score: 3, id: qData.player.id }));
				const correctSfx = require('../../sfx/correctsfx.mp3');
				const correct = new UIfx(correctSfx, {
					volume: 1,
					throttleMs: 100
				});
				correct.play();
			} else {
				dispatch(updateScore({ score: -1, id: qData.player.id }));
				const incorrectSfx = require('../../sfx/incorrectsfx.mp3');
				const incorrect = new UIfx(incorrectSfx, {
					volume: 1,
					throttleMs: 100
				});
				incorrect.play();
			}
			setTimeout(() => {
				setScoreboardShown(true);
			}, 2500);
			goToNext();
		}, 500);
	};

	// If any of the options are a falsey value, don't return anything
	// This is to prevent blank options being rendered when the question does not have exactly 4 or 2 options as expected
	const renderOptions = (): (JSX.Element | '')[] => {
		return options.map(
			option =>
				option && (
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
		dispatch(updateScore({ score: -1, id: qData.player.id }));
		setTimeout(() => {
			setScoreboardShown(true);
		}, 2500);
		goToNext();
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
			return <div></div>;
		} else {
			return <Timer>{`${minutes ? minutes * 60 + seconds : seconds}`}</Timer>;
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
					<CenterContainer>
						{scoreboardTransition.map(
							({ item, props, key }) =>
								item && (
									<animated.div key={key} style={props}>
										<Scoreboard />
									</animated.div>
								)
						)}
						{feedbackContainerTransition.map(
							({ item, props, key }) =>
								item !== null &&
								!scoreboardShown &&
								!timedOut && (
									<FeedbackContainer
										key={key}
										style={props}
										choiceValid={choiceValid ? 1 : undefined}
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
									onComplete={countdownPaused ? undefined : onTimeout}
								/>
								{feedbackContainerTransition.map(
									({ item, props, key }) =>
										item !== null &&
										timedOut &&
										!scoreboardShown && (
											<TimeoutOverlay
												key={key}
												style={props}
												completed={timedOut}
											>
												Time out!
											</TimeoutOverlay>
										)
								)}
							</>
						)}
					</CenterContainer>
				</Root>
			))}
		</div>
	);
};
