import React, { useState } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { Modal } from '../Modal';
import { EditForm } from './EditForm';
import { Question } from '../../types';
import { Root } from './questionItemStyles';

interface QuestionItemProps {
	question: Question;
	type: string;
}

const WrappedComponent: React.FC<QuestionItemProps> = ({ type, question }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const onBtnClick = (): void => {
		// maybe think about what you're doing before you code. it'll save you time, trust me. Your actions have repurcussions
		setModalOpen(true);
	};

	return (
		<Root>
			{question.question}
			<button onClick={onBtnClick}>Click me to Open Modal!</button>
			{modalOpen && (
				<Modal
					open={modalOpen}
					setModalOpen={setModalOpen}
					aria-labelledby="modal-label"
					aria-describedby="model-desc"
				>
					<EditForm question={question} setEditModalOpen={setModalOpen} />
				</Modal>
			)}
		</Root>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
