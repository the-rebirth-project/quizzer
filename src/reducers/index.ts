import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { quizAppReducer } from './quizAppReducers';

export const rootReducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		quizApp: quizAppReducer
	});

export * from './quizAppReducers';

// https://github.com/SKP-000/Quiz-App.git
