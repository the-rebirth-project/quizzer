import React from 'react';
import { Menu } from './Menu';
import { Question } from './Question';
import { CreateQuiz } from './CreateQuiz';
import { history } from '../store';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

export const Routes: React.FC = () => {
	const started = useSelector((state: RootState) => state.quiz.started);

	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" render={() => <Menu />} />
				{started && (
					<Route
						exact
						path="/start/q/:qId"
						render={routeProps => <Question {...routeProps} />}
					/>
				)}
				<Route exact path="/create" render={() => <CreateQuiz />} />
			</Switch>
		</ConnectedRouter>
	);
};
