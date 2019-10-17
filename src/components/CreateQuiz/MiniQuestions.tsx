import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'uuid/v4';
import { fetchQuestionsThunk } from '../../actions';
import { QuestionItem } from './QuestionItem';
import { CreateForm } from './CreateForm';
import { Modal } from '../Modal';
import { showModal } from '../../actions';
import { RootState } from '../../types';
import { Root, ButtonContainer, CreateButton } from './miniQuestionsStyles';

export const WrappedComponent: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const modalShown = useSelector((state: RootState) => state.modal.modalShown);
	const [modalOpen, setModalOpen] = useState(false);

	const onButtonClick = (): void => {
		const fetchRandomQuestions = async () => {
			await fetchQuestionsThunk(dispatch, 1);
		};
		fetchRandomQuestions();
	};

	const onCreateBtnClick = (): void => {
		setModalOpen(true);
		dispatch(showModal());
	};

	return (
		<Root>
			<ButtonContainer>
				<CreateButton onClick={onButtonClick} primary>
					Fetch Question
				</CreateButton>
				<CreateButton onClick={onCreateBtnClick} primary>
					Create Question
				</CreateButton>
			</ButtonContainer>
			<Modal
				open={modalOpen}
				setModalOpen={setModalOpen}
				aria-label="Create Question"
				key={uuid()}
			>
				<CreateForm setCreateModalOpen={setModalOpen} />
			</Modal>
			{questions.map((q, i) => (
				<QuestionItem
					disabled={modalShown}
					question={q}
					type="random"
					index={i}
					key={q.qId}
				/>
			))}
		</Root>
	);
};

// exports the above declared functional component as a child of SortableContainer
export const MiniQuestions = SortableContainer(WrappedComponent);
