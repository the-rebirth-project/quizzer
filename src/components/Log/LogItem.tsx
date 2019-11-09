import React from 'react';
import {
	Root,
	QContainer,
	OptionContainer,
	ScoreResult,
	OptionContainerSpan
} from './logItemStyles';
import { QuestionNum } from '../CreateQuiz/questionItemStyles';
import { QuestionLog } from '../../types';

interface LogItemProps {
	log: QuestionLog;
}

export const LogItem: React.FC<LogItemProps> = ({ log }) => {
	return (
		<Root>
			<QContainer>
				<QuestionNum>{log.qNum}.</QuestionNum> {log.question}
			</QContainer>

			<OptionContainer userChoice>
				<OptionContainerSpan>Chosen option: </OptionContainerSpan>
				{log.userChoice}
			</OptionContainer>
			<OptionContainer>
				<OptionContainerSpan>Correct option: </OptionContainerSpan>
				{log.correctAnswer}
			</OptionContainer>

			<ScoreResult correctChoice={log.choiceValid}>
				{log.calculatedScore} points
			</ScoreResult>
		</Root>
	);
};
