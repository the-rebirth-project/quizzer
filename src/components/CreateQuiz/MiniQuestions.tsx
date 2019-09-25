import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestionsThunk, openCreateModal } from '../../actions';
import { SortableContainer } from 'react-sortable-hoc';
import { QuestionItem } from './QuestionItem';
import { CreateForm } from './CreateForm';
import { Modal } from '../Modal';
import { RootState } from '../../types';
import { Root } from './miniQuestionsStyles';

export const WrappedComponent: React.FC = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const createModalOpen = useSelector(
		(state: RootState) => state.modal.createModalOpen
	);
	const editModalOpen = useSelector(
		(state: RootState) => state.modal.editModalOpen
	);

	const renderMiniQuestions = (): JSX.Element[] => {
		// type hardcoded as random for now
		return questions.map((q, i) => (
			<QuestionItem
				disabled={editModalOpen}
				question={q}
				type="random"
				index={i}
			/>
		));
	};

	const onButtonClick = (): void => {
		const fetchRandomQuestions = async () => {
			await fetchQuestionsThunk(dispatch, 1);
		};
		fetchRandomQuestions();
	};

	const onCreateBtnClick = (): void => {
		dispatch(openCreateModal());
	};

	return (
		<Root>
			<button onClick={onButtonClick}>Fetch a random question</button>
			<button onClick={onCreateBtnClick}>Create Question</button>
			<Modal
				open={createModalOpen}
				onModalClose={openCreateModal}
				aria-label="Create Question"
				aria-description="Create your own question"
			>
				<CreateForm />
			</Modal>
			{renderMiniQuestions()}
		</Root>
	);
};

// exports the above declared functional component as a child of SortableContainer
export const MiniQuestions = SortableContainer(WrappedComponent);
