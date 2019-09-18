import { createReducer } from 'typesafe-actions';
import { fetchQuestions, startQuiz, sortQuestion } from '../actions';
import { Question } from '../types';
interface IState {
	readonly questions: Question[];
	readonly started: boolean;
}

const initialState: IState = {
	questions: [],
	started: false
};

export const menuReducer = createReducer(initialState)
	.handleAction(fetchQuestions, (state, action) => ({
		...state,
		questions: [...state.questions, ...action.payload]
	}))
	.handleAction(startQuiz, (state, _) => ({
		...state,
		started: true
	}))
	.handleAction(sortQuestion, (state, action) => ({
		...state,
		questions: action.payload
	}));
