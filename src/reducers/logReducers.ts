import { createReducer } from 'typesafe-actions';
import { logUserChoice, clearLog } from '../actions';
import { QuestionLog } from '../types';

interface IState {
	readonly sessionLog: QuestionLog[];
}

const initialState: IState = {
	sessionLog: []
};

export const logReducer = createReducer(initialState)
	.handleAction(logUserChoice, (state, action) => {
		const {
			qId,
			question,
			userChoice,
			correct_answer,
			qNum,
			calculatedScore
		} = action.payload;
		const questionLog: QuestionLog = {
			qNum,
			qId,
			question,
			userChoice,
			choiceValid: userChoice === correct_answer ? true : false,
			correctAnswer: correct_answer,
			calculatedScore
		};
		return {
			...state,
			sessionLog: [...state.sessionLog, questionLog]
		};
	})
	.handleAction(clearLog, (state, _) => ({
		...state,
		sessionLog: []
	}));
