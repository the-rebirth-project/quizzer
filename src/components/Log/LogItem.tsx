import React from 'react';
import { Root, QContainer, OptionContainer } from './logItemStyles';
import { QuestionLog } from '../../types';

interface LogItemProps {
	log: QuestionLog;
}

export const LogItem: React.FC<LogItemProps> = ({ log }) => {
	return (
		<Root>
			<QContainer>
				{log.qNum}. {log.question}
			</QContainer>

			<OptionContainer userChoice>
				Chosen option: {log.userChoice}
			</OptionContainer>
			<OptionContainer>Correct option: {log.correctAnswer}</OptionContainer>
		</Root>
	);
};
