import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid/v4';
import { Modal } from '../Modal';
import { showModal } from '../../actions';
import { EditForm } from './EditForm';
import { Question, RootState } from '../../types';
import { Root, QuestionContainer } from './questionItemStyles';

interface QuestionItemProps {
	question: Question;
	type: string;
}

const WrappedComponent: React.FC<QuestionItemProps> = ({ type, question }) => {
	const dispatch = useDispatch();
	const editModeState = useSelector(
		(state: RootState) => state.toolbar.editMode
	);
	// have to use component state so that all of the modals don't open at once
	const [modalOpen, setModalOpen] = useState(false);

	const onQuestionClick = (): void => {
		// only open modal if editMode is set to true
		if (editModeState) {
			dispatch(showModal());
			setModalOpen(true);
		}
	};

	return (
		<Root>
			<QuestionContainer onClick={onQuestionClick}>
				{question.question}
			</QuestionContainer>
			<Modal
				open={modalOpen}
				setModalOpen={setModalOpen}
				key={uuid()}
				aria-labelledby="modal-label"
				aria-describedby="model-desc"
			>
				<EditForm question={question} setModalOpen={setModalOpen} />
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableElement
export const QuestionItem = SortableElement(WrappedComponent);
