import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { menuReducer } from './menuReducers';
import { questionReducer } from './questionReducers';

export const rootReducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		menu: menuReducer,
		question: questionReducer
	});

// CENTRAL EXPORTS
export * from './menuReducers';
export * from './questionReducers';
