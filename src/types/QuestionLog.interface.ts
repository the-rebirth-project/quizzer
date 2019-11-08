export interface QuestionLog {
	qNum: number;
	qId: string;
	question: string;
	userChoice: string;
	choiceValid: boolean;
	correctAnswer: string;
}
