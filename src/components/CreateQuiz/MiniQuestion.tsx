import React from 'react';
import { Question } from '../../types';
import { Root } from './miniQuestionStyles';

interface MiniQuestionProps {
	type: string;
	question: Question;
}

export const MiniQuestion: React.FC<MiniQuestionProps> = ({
	question,
	type
}) => {
	return (
		<Root>
			{type === 'random' && <h3>Random</h3>}
			{type === 'custom' && <h3>Custom</h3>}
		</Root>
	);
};
