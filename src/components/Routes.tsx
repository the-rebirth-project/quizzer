import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { MainMenu } from './MainMenu';
import { Question } from './Question';
import { CreateQuiz } from './CreateQuiz';
import { Config } from './Config';
import { Scoreboard } from './Scoreboard';
import { TurnOverlay } from './TurnOverlay';
import { WinOverlay } from './WinOverlay';
import { Log } from './Log';
import { history } from '../store';
import { RootState } from '../types';

export const Routes: React.FC = () => {
  const { location } = useSelector((state: RootState) => state.router);

  const transitions = useTransition(location, location => location.pathname, {
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' }
  });

  return (
    <ConnectedRouter history={history}>
      {transitions.map(({ key, item, props }) => (
        <animated.div
          key={key}
          style={{
            ...props,
            position: 'absolute',
            top: 0,
            width: '100%'
          }}
        >
          <Switch location={item}>
            <Route exact path="/" render={() => <MainMenu />} />
            <Route exact path="/create" render={() => <CreateQuiz />} />
            <Route exact path="/configure" render={() => <Config />} />

            <Route
              exact
              path="/start/q/:qPos"
              render={routeProps => <Question {...routeProps} />}
            />
            <Route
              exact
              path="/playerturn/:playerId/:nextQuestionPos"
              render={routeProps => <TurnOverlay {...routeProps} />}
            />
            <Route
              exact
              path="/scoreboard/:nextQuestionNum"
              render={routeProps => <Scoreboard {...routeProps} />}
            />
            <Route exact path="/finalresults" render={() => <WinOverlay />} />
            <Route exact path="/log" render={() => <Log />} />
          </Switch>
        </animated.div>
      ))}
    </ConnectedRouter>
  );
};
