import { createReducer } from 'typesafe-actions';
import { fetchQuestions } from '../actions';

export interface Question {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
}

interface IState {
	readonly questions: Question[];
}

const initialState: IState = {
	questions: []
};

export const quizAppReducer = createReducer(initialState).handleAction(
	fetchQuestions,
	(state, action) => ({
		...state,
		questions: [...state.questions, ...action.payload]
	})
);
