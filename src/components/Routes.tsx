import React from 'react';
import { Question } from './Question';
import { history } from '../store';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Menu } from './Menu';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

export const Routes: React.FC = () => {
	const started = useSelector((state: RootState) => state.menu.started);

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
			</Switch>
		</ConnectedRouter>
	);
};
