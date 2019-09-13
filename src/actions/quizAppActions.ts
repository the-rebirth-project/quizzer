import { createStandardAction } from 'typesafe-actions';
import { FETCH_QUESTIONS, START_QUIZ } from '../types';
import { Question } from '../types';
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchQuestions = createStandardAction(FETCH_QUESTIONS)<
	Question[]
>();

// thunk action
export const fetchQuestionsThunk = async (
	dispatch: Dispatch
): Promise<void> => {
	const response = await axios.get('https://opentdb.com/api.php?amount=50');
	console.log(response);
	// passes on response.data.results (an array of Question objects) to fetchQuestions action creator as payload
	const data: Question[] = response.data.results;
	dispatch(fetchQuestions(data));
};

export const startQuiz = createStandardAction(START_QUIZ)<undefined>();
