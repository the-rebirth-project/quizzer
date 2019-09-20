import { createReducer } from 'typesafe-actions';
import { validateChoice, rehydrateState } from '../actions';

// if chosen option is correct, then choiceValid is true, else false.
interface IState {
	readonly choiceValid: boolean | null;
}

// will be null before the user has made their choice
const initialState: IState = {
	choiceValid: null
};

export const questionReducer = createReducer(initialState)
	.handleAction(validateChoice, (state, action) => ({
		...state,
		choiceValid:
			action.payload.choice === action.payload.correctAnswer ? true : false
	}))
	.handleAction(rehydrateState, () => ({
		...initialState
	}));
