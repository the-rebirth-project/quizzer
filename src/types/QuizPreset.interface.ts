import { Question } from './Question.interface';

export interface QuizPreset {
	quizId: string;
	questions: Question[];
}
