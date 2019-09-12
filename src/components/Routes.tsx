import React from 'react';
import { Question } from './Question';
import { history } from '../store';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { QuizApp } from './QuizApp';

export const Routes: React.FC = () => {
	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" render={() => <QuizApp />} />
				<Route exact path="/start/q/:qId" render={() => <Question />} />
			</Switch>
		</ConnectedRouter>
	);
};
