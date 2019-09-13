import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { quizAppReducer } from './quizAppReducers';

export const rootReducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		quizApp: quizAppReducer
	});

// CENTRAL EXPORTS
export * from './quizAppReducers';
