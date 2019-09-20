import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions';
import { Modal } from '../Modal';
import { SortableElement } from 'react-sortable-hoc';
import { Root } from './questionItemStyles';

const WrappedComponent: React.FC<{ type: string }> = ({ type }) => {
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
				<h1 id="modal-label">I'm a Modal!</h1>
				<p id="modal-desc">I'm a non-animated Modal!</p>
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
