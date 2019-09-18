import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const WrappedComponent: React.FC<{ type: string }> = ({ type }) => {
	return (
		<div>
			{type === 'random' && <h3>Random</h3>}
			{type === 'custom' && <h3>Custom</h3>}
		</div>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
