import React from 'react';

interface EditQuestionProps {
	qId: string;
}

export const EditQuestion: React.FC<EditQuestionProps> = props => {
	return (
		<div>
			<h1>Edit the question!</h1>
		</div>
	);
};
