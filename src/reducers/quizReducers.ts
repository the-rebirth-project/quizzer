import { createReducer } from 'typesafe-actions';
import uuid from 'uuid/v4';
import {
	fetchQuestions,
	startQuiz,
	setPresetId,
	sortQuestion,
	createCustomQuestion,
	saveEditedQuestion,
	deleteQuestion,
	savePreset
} from '../actions';
import { Question, QuizPreset } from '../types';

interface IState {
	readonly questions: Question[];
	readonly started: boolean;
	readonly presets: QuizPreset[];
	readonly curPresetId: string;
}

const initialState: IState = {
	questions: [],
	started: false,
	presets: JSON.parse(window.localStorage.getItem('quizPresets') || '[]'),
	curPresetId: ''
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
	.handleAction(setPresetId, (state, action) => ({
		...state,
		curPresetId: action.payload,
		questions: [
			...state.presets.filter(p => p.id === action.payload)[0].questions
		]
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
	}))
	.handleAction(savePreset, (state, action) => {
		/**
		 * Info about Quiz Presets:
		 * - A quiz preset describes the id by which the preset will be identified and an array of questions 		 		 which the user specified in the create section
		 * - In the config form, the user is asked to select a preset either from the locally saved presets or 			 from a preset uploaded by another user
		 */
		const newPresets = [...state.presets, action.payload];
		window.localStorage.setItem('quizPresets', JSON.stringify(newPresets));
		return {
			...state,
			presets: newPresets
		};
	});
