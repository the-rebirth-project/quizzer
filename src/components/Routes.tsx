import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import { Menu } from './MainMenu';
import { Question } from './Question';
import { CreateQuiz } from './CreateQuiz';
import { Config } from './Config';
import { Log } from './Log';
import { history } from '../store';
import { RootState } from '../types';

export const Routes: React.FC = () => {
	const started = useSelector((state: RootState) => state.quiz.started);

	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" render={() => <Menu />} />
				{started && (
					<Route
						path="/start/q/:qId"
						render={routeProps => <Question {...routeProps} />}
					/>
				)}
				<Route exact path="/create" render={() => <CreateQuiz />} />
				<Route
					exact
					path="/configure/:pageNum"
					render={routeProps => <Config {...routeProps} />}
				/>
				<Route exact path="/log" render={() => <Log />} />
			</Switch>
		</ConnectedRouter>
	);
};
