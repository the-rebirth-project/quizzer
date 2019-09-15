import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { quizAppReducer } from './quizAppReducers';
import { questionReducer } from './questionReducers';

export const rootReducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		quizApp: quizAppReducer,
		question: questionReducer
	});

// CENTRAL EXPORTS
export * from './quizAppReducers';
export * from './questionReducers';
