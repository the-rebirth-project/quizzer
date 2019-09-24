import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { useDispatch } from 'react-redux';
import { Modal } from '../Modal';
import { EditForm } from './EditForm';
import { openModal } from '../../actions';
import { Question } from '../../types';
import { Root } from './questionItemStyles';

interface QuestionItemProps {
	question: Question;
	type: string;
}

const WrappedComponent: React.FC<QuestionItemProps> = ({ type, question }) => {
	const dispatch = useDispatch();

	const onButtonClick = (): void => {
		dispatch(openModal());
	};

	return (
		<Root>
			{type === 'random' && <h3>Random</h3>}
			{type === 'custom' && <h3>Custom</h3>}
			<button onClick={onButtonClick}>Click me to Open Modal!</button>
			<Modal aria-labelledby="modal-label" aria-describedby="model-desc">
				<EditForm question={question} />
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
