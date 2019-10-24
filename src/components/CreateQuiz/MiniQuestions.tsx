import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'uuid/v4';
import { fetchQuestionsThunk } from '../../actions';
import { QuestionItem } from './QuestionItem';
import { CreateForm } from './CreateForm';
import { SaveForm } from './SaveForm';
import { Modal } from '../Modal';
import { showModal } from '../../actions';
import { RootState } from '../../types';
import { Root, ButtonContainer, CreateQuizBtn } from './miniQuestionsStyles';

export const WrappedComponent: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const modalShown = useSelector((state: RootState) => state.modal.modalShown);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [saveModalOpen, setSaveModalOpen] = useState(false);

	const onFetchBtnClick = (): void => {
		const fetchRandomQuestions = async () => {
			await fetchQuestionsThunk(dispatch, 1);
		};
		fetchRandomQuestions();
	};

	const onCreateBtnClick = (): void => {
		setCreateModalOpen(true);
		dispatch(showModal());
	};

	const onSaveBtnClick = (): void => {
		setSaveModalOpen(true);
		dispatch(showModal());
	};

	return (
		<Root>
			<ButtonContainer>
				<CreateQuizBtn onClick={onFetchBtnClick} primary>
					Fetch Question
				</CreateQuizBtn>
				<CreateQuizBtn onClick={onCreateBtnClick} primary>
					Create Question
				</CreateQuizBtn>
				<CreateQuizBtn primary onClick={onSaveBtnClick}>
					Save
				</CreateQuizBtn>
			</ButtonContainer>
			{questions.map((q, i) => (
				<QuestionItem
					disabled={modalShown}
					question={q}
					type="random"
					index={i}
					qPos={i + 1}
					key={q.qId}
				/>
			))}
			<Modal
				open={createModalOpen}
				setModalOpen={setCreateModalOpen}
				aria-label="Create Question"
				key={uuid()}
			>
				<CreateForm setCreateModalOpen={setCreateModalOpen} />
			</Modal>
			<Modal
				open={saveModalOpen}
				setModalOpen={setSaveModalOpen}
				aria-label="Save Questions"
				key={uuid()}
			>
				<SaveForm setSaveModalOpen={setSaveModalOpen} />
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableContainer
export const MiniQuestions = SortableContainer(WrappedComponent);
