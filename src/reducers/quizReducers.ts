import { createReducer } from 'typesafe-actions';
import uuid from 'uuid/v4';
import {
	fetchQuestions,
	startQuiz,
	sortQuestion,
	createCustomQuestion,
	saveEditedQuestion,
	deleteQuestion
} from '../actions';
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
	}))
	.handleAction(createCustomQuestion, (state, action) => ({
		...state,
		questions: [...state.questions, action.payload]
	}))
	.handleAction(saveEditedQuestion, (state, action) => {
		const editedQuestion = state.questions.filter(
			q => q.qId === action.payload.qId
		)[0];

		// overwrite the selected question with the new properties
		const newQuestion = {
			...editedQuestion,
			...action.payload
		};

		return {
			...state,
			questions: state.questions.map(q =>
				q.qId === action.payload.qId ? newQuestion : q
			)
		};
	})
	.handleAction(deleteQuestion, (state, action) => ({
		...state,
		questions: state.questions.filter(q => q.qId !== action.payload)
	}));
