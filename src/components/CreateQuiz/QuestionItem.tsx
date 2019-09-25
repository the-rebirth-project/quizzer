import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { Modal } from '../Modal';
import { EditForm } from './EditForm';
import { openEditModal } from '../../actions';
import { RootState, Question } from '../../types';
import { Root } from './questionItemStyles';

interface QuestionItemProps {
	question: Question;
	type: string;
}

const WrappedComponent: React.FC<QuestionItemProps> = ({ type, question }) => {
	const dispatch = useDispatch();
	const editModalOpen = useSelector(
		(state: RootState) => state.modal.editModalOpen
	);

	const onBtnClick = (): void => {
		// keep in mind that openEditModal and similar modal actions can work in reverse too i.e close the modal
		dispatch(openEditModal());
	};

	return (
		<Root>
			{type === 'random' && <h3>Random</h3>}
			{type === 'custom' && <h3>Custom</h3>}
			<button onClick={onBtnClick}>Click me to Open Modal!</button>
			<Modal
				open={editModalOpen}
				onModalClose={openEditModal}
				aria-labelledby="modal-label"
				aria-describedby="model-desc"
			>
				<EditForm question={question} />
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
