import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { quizReducer } from './quizReducers';
import { questionReducer } from './questionReducers';
import { modalReducer } from './modalReducers';

export const rootReducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		quiz: quizReducer,
		question: questionReducer,
		modal: modalReducer
	});
