import React, { useState, useEffect } from 'react';
import { Route } from 'navi';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Countdown from 'react-countdown-now';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import UIfx from 'uifx';
import uuid from 'uuid/v4';
import { Menu } from './Menu';
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

interface RouteData {
  urlParams: {
    qPos: string;
  };
}

export const Question: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route: Route<RouteData> = useCurrentRoute();
  const [timedOut, setTimedOut] = useState(false);
  const [countdownPaused, setCountdownPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const choiceValid = useSelector(
    (state: RootState) => state.question.choiceValid
  );
  const questionNum = route.data ? parseInt(route.data.urlParams.qPos) : 0;
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
    dispatch(rehydrateState()); // sets choiceValid back to null after each question
  }, [dispatch, questionNum]);

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
      if (questionNum >= questions.length - 1) {
        navigation.navigate('/finalresults');
      } else {
        navigation.navigate(`/scoreboard/${questionNum + 1}`);
      }
    }, 3000);
  };

  const onOptionClick = (option: string): void => {
    setCountdownPaused(true);
    const logUserChoicePayload = {
      ...qData,
      qNum: questionNum + 1,
      userChoice: option,
      calculatedScore: option === qData.correct_answer ? +3 : -1
    };
    // Logs data to be used in the Log component
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
    <Root>
      <div
        onClick={() => setMenuOpen(true)}
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          zIndex: 40
        }}
      >
        Menu
      </div>
      <QuestionWrapper started={started}>{renderQuestion()}</QuestionWrapper>
      <OptionsWrapper started={started}>{renderOptions()}</OptionsWrapper>
      <CenterContainer>
        {feedbackContainerTransition.map(
          ({ item, props, key }) =>
            item !== null &&
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
                timedOut && (
                  <TimeoutOverlay key={key} style={props} completed={timedOut}>
                    Time out!
                  </TimeoutOverlay>
                )
            )}
          </>
        )}
      </CenterContainer>
      {menuOpen && <Menu open={menuOpen} setOpen={setMenuOpen} />}
    </Root>
  );
};
