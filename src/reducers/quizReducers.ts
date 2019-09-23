import { createReducer } from 'typesafe-actions';
import uuid from 'uuid/v4';
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

export const quizReducer = createReducer(initialState)
	.handleAction(fetchQuestions, (state, action) => {
		const newPayload = action.payload.map(q => ({
			qId: uuid(),
			...q
		}));

		return {
			...state,
			questions: [...state.questions, ...newPayload]
		};
	})
	.handleAction(startQuiz, (state, _) => ({
		...state,
		started: true
	}))
	.handleAction(sortQuestion, (state, action) => ({
		...state,
		questions: action.payload
	}));
