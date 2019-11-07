import { createReducer } from 'typesafe-actions';
import { logUserChoice } from '../actions';

interface QuestionLog {
	qId: string;
	question: string;
	userChoice: string;
	choiceValid: boolean;
	correctAnswer: string;
}

interface IState {
	readonly sessionLog: QuestionLog[];
}

const initialState: IState = {
	sessionLog: []
};

export const logReducer = createReducer(initialState).handleAction(
	logUserChoice,
	(state, action) => {
		const { qId, question, userChoice, correct_answer } = action.payload;
		const questionLog: QuestionLog = {
			qId,
			question,
			userChoice,
			choiceValid: userChoice === correct_answer ? true : false,
			correctAnswer: correct_answer
		};
		return {
			...state,
			sessionLog: [...state.sessionLog, questionLog]
		};
	}
);
