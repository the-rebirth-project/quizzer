import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'uuid/v4';
import { QuestionItem } from './QuestionItem';
import { CreateForm } from './CreateForm';
import { FetchForm } from './FetchForm';
import { Modal } from '../Modal';
import { showModal, savePreset } from '../../actions';
import { RootState } from '../../types';
import { Root, ButtonContainer, CreateQuizBtn } from './miniQuestionsStyles';

export const WrappedComponent: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const modalShown = useSelector((state: RootState) => state.modal.modalShown);
	const curPresetId = useSelector((state: RootState) => state.quiz.curPresetId);
	const curPresetData = useSelector(
		(state: RootState) => state.quiz.presets
	).filter(p => p.id === curPresetId)[0];
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [fetchModalOpen, setFetchModalOpen] = useState(false);

	const onFetchBtnClick = (): void => {
		setFetchModalOpen(true);
		dispatch(showModal());
	};

	const onCreateBtnClick = (): void => {
		setCreateModalOpen(true);
		dispatch(showModal());
	};

	const onSaveBtnClick = (): void => {
		const newPresetData = {
			...curPresetData,
			questions
		};
		dispatch(
			savePreset({
				id: curPresetId,
				newPresetData
			})
		);
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
				open={fetchModalOpen}
				setModalOpen={setFetchModalOpen}
				aria-label="Fetch Questions"
				key={uuid()}
			>
				<FetchForm setFetchModalOpen={setFetchModalOpen} />
			</Modal>
		</Root>
	);
};

// exports the above declared functional component as a child of SortableContainer
export const MiniQuestions = SortableContainer(WrappedComponent);
