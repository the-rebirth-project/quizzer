import { Team } from './Team.interface';

export interface Question {
	qId: string;
	category: string;
	difficulty: string;
	question: string;
	type: string;
	incorrect_answers: string[];
	correct_answer: string;
	options: string[];
	timer: number;
	team: Team;
	modifiers: {
		timed: boolean;
	};
}
