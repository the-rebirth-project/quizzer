import * as React from 'react';
import App from './components/App';
import { history } from './store';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

export const Routes: React.FC = () => {
	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" render={() => <App />} />
			</Switch>
		</ConnectedRouter>
	);
};
