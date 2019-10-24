import { Question } from './Question.interface';

export interface QuizPreset {
	id: string;
	presetName: string;
	questions: Question[];
}
