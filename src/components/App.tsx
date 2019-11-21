import React, { useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from './Routes';
import { setPresetId } from '../actions';
import { RootState } from '../types';

const Background = styled(animated.div)`
  --primary-rgb-color: 38, 188, 99;
  --secondary-rgb-color: 242, 243, 229;
  --amethyst-rgb-color: 101, 0, 246;
  --grey-rgb-color: 46, 46, 46;
  --teal-rgb-color: 26, 172, 172;
  height: 100vh;
`;

export const App: React.FC = () => {
  const dispatch = useDispatch();
  // using both location.pathname and the started boolean in order to determine if we should flip the background. maybe there's a better solution?
  const { location } = useSelector((state: RootState) => state.router);
  const started = useSelector((state: RootState) => state.quiz.started);
  const quizPresets = useSelector((state: RootState) => state.quiz.presets);

  useEffect(() => {
    quizPresets[0] && dispatch(setPresetId(quizPresets[0].id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.localStorage.setItem('quizPresets', JSON.stringify(quizPresets));
  }, [quizPresets]);

  const getBG = () => {
    switch (true) {
      case location.pathname.includes('/start/q/') && started:
        return 'linear-gradient(180deg, #2ac46a 0%, #2ac46a 50%, #fcfcf3 50%)';
      case location.pathname.includes('/configure') ||
        location.pathname.includes('/log') ||
        location.pathname.includes('/create') ||
        location.pathname.includes('/scoreboard'):
        return `linear-gradient(90deg, #2ac46a 0%, #2ac46a 30%, #fcfcf3 30%)`;
      case location.pathname.includes('/playerturn'):
        return `linear-gradient(90deg, #6e00fe 0%, #6e00fe 50%, #6e00fe 50%)`;
      case location.pathname.includes('/finalresults'):
        return `linear-gradient(90deg, #2ac46a 0%, #2ac46a 50%, #2ac46a 50%)`;
      default:
        return `linear-gradient(110deg, #2ac46a 0%, #2ac46a 50%, #fcfcf3 50%)`;
    }
  };

  const animProps = useSpring({
    from: {
      backgroundImage:
        'linear-gradient(120deg, #2ac46a 0%, #2ac46a 50%, #fcfcf3 50%)'
    },
    to: {
      backgroundImage: getBG()
    }
  });

  return (
    <Background style={animProps}>
      <Routes />
    </Background>
  );
};
