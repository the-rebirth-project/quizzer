import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid/v4';
import { Modal } from '../Modal';
import { showModal } from '../../actions';
import { EditForm } from './EditForm';
import { Question } from '../../types';
import { Root } from './questionItemStyles';

interface QuestionItemProps {
	question: Question;
	type: string;
}

const WrappedComponent: React.FC<QuestionItemProps> = ({ type, question }) => {
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(false);

	const onBtnClick = (): void => {
		// maybe think about what you're doing before you code. it'll save you time, trust me. Your actions have repurcussions
		setModalOpen(true);
		dispatch(showModal());
	};

	return (
		<Root>
			{question.question}
			<button onClick={onBtnClick}>Click me to Open Modal!</button>
			<Modal
				open={modalOpen}
				setModalOpen={setModalOpen}
				key={uuid()}
				aria-labelledby="modal-label"
				aria-describedby="model-desc"
			>
				<EditForm question={question} setEditModalOpen={setModalOpen} />
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
