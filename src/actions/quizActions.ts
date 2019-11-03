import { createStandardAction } from 'typesafe-actions';
import he from 'he';
import { FETCH_QUESTIONS, START_QUIZ, SET_PRESET_ID } from '../types';
import { Question } from '../types';
import axios from 'axios';
import { Dispatch } from 'redux';
import { shuffleArray } from '../helpers';

export const fetchQuestions = createStandardAction(FETCH_QUESTIONS)<
	Question[]
>();

// thunk action
export const fetchQuestionsThunk = async (
	dispatch: Dispatch,
	numOfQuestions: number,
	category: string,
	difficulty: string,
	type: string,
	timer?: number
): Promise<void> => {
	const formUrl = (property: string, value: string): string => {
		if (value === 'any') {
			return '';
		} else {
			return `${property}=${value}`;
		}
	};
	const response = await axios.get(
		`https://opentdb.com/api.php?amount=${numOfQuestions}&${formUrl(
			'category',
			category
		)}&${formUrl('difficulty', difficulty)}&${formUrl('type', type)}`
	);
	// passes on response.data.results (an array of Question objects) to fetchQuestions action creator as payload
	const data: Question[] = response.data.results;
	const newData = data.map(q => {
		return {
			...q,
			question: he.decode(q.question),
			category: he.decode(q.category),
			// if type is MCQ, shuffle the array else do not shuffle the array and simply return an array with True and false string literals.
			options:
				q.type !== 'boolean'
					? shuffleArray([
							...q.incorrect_answers.map(incAns => he.decode(incAns)),
							he.decode(q.correct_answer)
					  ])
					: ['True', 'False'],
			timer: timer ? timer : 0,
			modifiers: {
				timed: timer ? true : false
			}
		};
	});
	dispatch(fetchQuestions(newData));
};

export const startQuiz = createStandardAction(START_QUIZ)();
// sets the chosen preset id
export const setPresetId = createStandardAction(SET_PRESET_ID)<string>();
