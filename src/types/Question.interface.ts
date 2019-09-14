export interface Question {
	category: string;
	difficulty: string;
	question: string;
	type: string;
	incorrect_answers: string[];
	correct_answer: string;
	options: string[];
}
