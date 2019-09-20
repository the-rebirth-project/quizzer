import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { menuReducer } from './menuReducers';
import { questionReducer } from './questionReducers';
import { modalReducer } from './modalReducers';

export const rootReducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		menu: menuReducer,
		question: questionReducer,
		modal: modalReducer
	});

// CENTRAL EXPORTS
export * from './menuReducers';
export * from './questionReducers';
export * from './modalReducers';
